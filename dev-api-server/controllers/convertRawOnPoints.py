import csv
import json
import sys

csv.field_size_limit(sys.maxsize)

output = open("eroadOnPoints.json","w+")

output.write("""
{
    "type": "FeatureCollection",
    "features": [
""")

with open('rawEroadOnPoints.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        vehicleId = row[0]
        sensor_name = row[1]

        startCoords = row[2][len("POINT("):-len(")")].split(' ')
        coordinates = """[%s,%s]""" % (startCoords[0], startCoords[1])

        on_odometer = row[3]

        feature = """{
            "type": "Feature",
            "properties": {
                "vehicleId": "%s",
                "sensorName": "%s",
                "on_odometer": "%s"
            },
            "geometry": {
                "type": "Point",
                "coordinates": %s
            }
        },""" % (vehicleId, sensor_name, on_odometer, coordinates)
        
        output.write(feature)

output.write("""]
}""")