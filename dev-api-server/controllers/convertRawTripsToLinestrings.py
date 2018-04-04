import csv
import json
import sys

csv.field_size_limit(sys.maxsize)

output = open("all.json","w+")

output.write("""
{
    "type": "FeatureCollection",
    "features": [
""")

with open('all.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        # print("new row!")
        vehicleId = row[0]

        startCoords = row[1][len("POINT("):-len(")")].split(' ')
        coordinates = """[%s,%s],""" % (startCoords[0], startCoords[1])

        journey = row[2][len("LINESTRING("):-len(")")].split(',')
        for journeyPoint in journey:
            journeyPointCoord = journeyPoint.split(' ')
            if (len(journeyPointCoord) != 2):
                continue
            coordinates += """[%s,%s], """ % (journeyPointCoord[0], journeyPointCoord[1])

        endCoords = row[3][len("POINT("):-len(")")].split(' ')
        coordinates += """[%s,%s]""" % (endCoords[0], endCoords[1])

        sensor_name = row[4]

        feature = """{
            "type": "Feature",
            "properties": {
                "vehicleId": "%s",
                "sensorName": "%s"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [%s]
            }
        },""" % (vehicleId, sensor_name, coordinates)
        
        output.write(feature)

output.write("""]
}""")

# import csv
# import json
# import sys

# csv.field_size_limit(sys.maxsize)

# def convert_collection(reader):
#     return {
#         'type': 'FeatureCollection',
#         'features': [convert_row(row) for row in reader],
#     }

# def convert_row(row):
#     return {
#         "type": "Feature",
#         "properties": {
#             "vehicleId": row[0],
#             "sensorName": row[4]
#         },
#         "geometry": {
#             "type": "LineString",
#             "coordinates": [point_to_coords(row[1])] + linestring_to_list(row[2]) + [point_to_coords(row[3])],
#         },
#     }

# def point_to_coords(point):
#     return point[len("POINT("):-len(")")].split(' ')

# def linestring_to_list(middle_str):
#     journey = middle_str[len("LINESTRING("):-len(")")].split(',')
#     return [journeyPoint.split(' ') for journeyPoint in journey]

# with open('rawEroadData.csv', newline='') as f:
#     result = convert_collection(csv.reader(f))

# with open("eroadTrips.json","w+") as outfile:
#     outfile.write(json.dumps(result, indent='    '))