import time
from flask import Flask
import requests
from xml.dom import minidom
import datetime
import pytz

# стоимость за кг
SHRIMP_VALUE = 919

app = Flask(__name__)

def format_date(date, month, year, hour=None, minute=None):
    res = '/'.join((str(date).zfill(2), str(month).zfill(2), str(year).zfill(2)[-2:]))
    if hour and minute:
        res = res + ' ' + ':'.join((str(hour).zfill(2), str(minute).zfill(2)))
    return res

@app.route('/exchange_rate')
def get_exchange_rate():
    crb_response = requests.get('http://www.cbr.ru/scripts/XML_daily.asp')

    response = {'items':[], 'cost':SHRIMP_VALUE, 'date': format_date(24, 1, 21)}
    response_item = {'name':'Российский рубль', 'code': 'RUB', 'value': round(1/SHRIMP_VALUE*1000, 2)}
    response['items'].append(response_item)
    xmldoc = minidom.parseString(crb_response.text)
    itemlist = xmldoc.getElementsByTagName('Valute')
    for item in itemlist:
        response_item = {}
        response_item['name'] = item.getElementsByTagName('Name')[0].firstChild.nodeValue
        response_item['code'] = item.getElementsByTagName('CharCode')[0].firstChild.nodeValue
        nominal = float(item.getElementsByTagName('Nominal')[0].firstChild.nodeValue)
        value = item.getElementsByTagName('Value')[0].firstChild.nodeValue
        value = float(value.replace(',', '.'))
        response_item['value'] = round(value/nominal/SHRIMP_VALUE*1000, 2)
        response['items'].append(response_item)

    val_curs = xmldoc.getElementsByTagName('ValCurs')[0]
    response['crb_date'] = format_date(*(val_curs.getAttribute('Date').split('.')))
    moscow_tz = pytz.timezone('Europe/Moscow')
    current_date = datetime.datetime.now(tz = moscow_tz)
    response['update_date'] = format_date(current_date.day, current_date.month, current_date.year, current_date.hour, current_date.minute)
    return response
