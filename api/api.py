import time
from flask import Flask
import requests
from xml.dom import minidom

# стоимость за кг
SHRIMP_VALUE = 919

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/exchange_rate')
def get_exchange_rate():
    crb_response = requests.get('http://www.cbr.ru/scripts/XML_daily.asp')

    response = {'items':[]}
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
    return response
