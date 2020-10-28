import json
import boto3
import logging

from boto3.dynamodb.conditions import Key
from typing import Optional, Dict

dynamodb = boto3.resource('dynamodb')
logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s %(levelname)s %(message)s'
)
logger = logging.getLogger()

def insert_counter_for_new_project(project: str):
    try:
        table = dynamodb.Table('tutorial-tickets_project-counters')
        response = table.put_item(
           Item={
                'project': project,
                'nextTicketNumber': 1
                }
        )
    except dyanamodb.exceptions.TransactionConflictException as t:
        return
    except Exception as e:
        logger.error(response)

def try_read_and_update(project: str) -> Optional[int]:
    table = dynamodb.Table('tutorial-tickets_project-counters')
    response = table.get_item(
        Key={'project': project},
    )
    if not 'Item' in response:
        insert_counter_for_new_project(project)
        return False
    else:
        table = dynamodb.Table('tutorial-tickets_project-counters')
        response = table.update_item(
            Key={'project': project},
            UpdateExpression="set nextTicketNumber = nextTicketNumber + :increment",
            ExpressionAttributeValues={
                ':increment': 1
            },
            ReturnValues="UPDATED_NEW"
        )
        "set info.rating = info.rating + :val",

    return response['Attributes']['nextTicketNumber']


def reservation_exists(reservation: Dict[str, str]) -> bool:
    table = dynamodb.Table('tutorial-tickets_reservations')
    response = table.get_item(
        Key={
            'project': reservation["projectId"],
            'email': reservation["email"]
        }
    )
    return 'Item' in response

def read_and_update_ticket_number(project: str, num_retries: int=3) -> Optional[int]:
    remaining_retries = num_retries
    while remaining_retries > 0:
        ticketNum = try_read_and_update(project)
        if ticketNum is not None:
            return int(ticketNum)
        remaining_retries -= 1
    return None

def create_reservation(reservation: Dict[str, str], ticket_number: int) -> bool:
    try:
        table = dynamodb.Table('tutorial-tickets_reservations')
        table.put_item(
           Item={
                "firstName": reservation["firstName"],
                "lastName": reservation["lastName"],
                "email": reservation["email"],
                "project": reservation["projectId"],
                "institution": reservation["institution"],
                'ticketNumber': ticket_number
            }
        )
    except Exception as e:
        return False;
    return True

def lambda_handler(event, context):
    corsHeaders =  {'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'}
    body=json.loads(event['body'])
    reservation = {
        'projectId' : event['pathParameters']['projectId'].strip(),
        'firstName': body["firstName"].strip(),
        'lastName' : body["lastName"].strip(),
        'email': body["email"].strip(),
        'institution': body["institution"].strip()
    }
    if reservation_exists(reservation):
        return {
            'statusCode': 400,
            'headers': corsHeaders,
            'body': json.dumps({'error': 'A reservation already exists for that email address'})
        }

    ticketNumber = read_and_update_ticket_number(reservation['projectId'])
    if ticketNumber is None:
            return {
            'statusCode':  503,
            'headers': corsHeaders,
            'body': json.dumps({'error': "No reservations available"})
        }
    else:
        if create_reservation(reservation, ticketNumber):
            return {
                'statusCode': 201,
                'headers': corsHeaders,
                'body': json.dumps({'ticketNumber': ticketNumber})
            }
        else:
            return {
                'statusCode': 500,
                'headers': corsHeaders,
                'body': json.dumps({'error': 'Could not create reservation'})
            }


