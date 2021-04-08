import requests

url = "https://app.autogradr.com/api/files/upload"

payload = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"files\"; filename=\"debug.log\"\r\nContent-Type: text/plain\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--"
headers = {
    'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    'origin': "https://app.autogradr.com",
    'x-devtools-emulate-network-conditions-client-id': "C67F89167BF7D55F9EBA8775BF58988",
    'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
    'accept': "*/*",
    'referer': "https://app.autogradr.com/assignment/244/project/30",
    'accept-encoding': "gzip, deflate, br",
    'accept-language': "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
    'cookie': "mp_a599cdf67ec612d3f87e765c9a993f48_mixpanel=%7B%22distinct_id%22%3A%20%22162963cea9532a-0bde035d04000a-b34356b-100200-162963cea9736d%22%2C%22%24initial_referrer%22%3A%20%22http%3A%2F%2Fwww.autogradr.com%2F%3F%22%2C%22%24initial_referring_domain%22%3A%20%22www.autogradr.com%22%2C%22%24email%22%3A%20%22abhinav%40skillspeed.com%22%2C%22%24name%22%3A%20%22Abhinav%22%7D; user=eyJpZCI6NiwibmFtZSI6IkFiaGluYXYiLCJlbWFpbCI6ImFiaGluYXZAc2tpbGxzcGVlZC5jb20iLCJyb2xlIjoiSU5TVFJVQ1RPUiIsImlzQWN0aXZlIjp0cnVlLCJjb3Vyc2VzIjpbNyw0NCwzODldfQ==; mp_mixpanel__c=0; __tawkuuid=e::app.autogradr.com::J3Cwn/5nvjFu/CENJ5xK9kFw6MUJtLKHYRnylbzwW/CvSJ1aO7GdsqXWiGKElm9f::2; Tawk_58bda1655b89e2149e11fbf4=vs60.tawk.to::0; session=MTUyMzM2NTE3MXxEdi1CQkFFQ180SUFBUkFCRUFBQUhmLUNBQUVHYzNSeWFXNW5EQVlBQkhWelpYSUZhVzUwTmpRRUFnQU18a5z0gRZr4jMxmvGW1oreSk6Y9nmOZ5zb-n0OvHoRCeY=; TawkConnectionTime=1523365421739; mp_a599cdf67ec612d3f87e765c9a993f48_mixpanel=%7B%22distinct_id%22%3A%20%22162963cea9532a-0bde035d04000a-b34356b-100200-162963cea9736d%22%2C%22%24initial_referrer%22%3A%20%22http%3A%2F%2Fwww.autogradr.com%2F%3F%22%2C%22%24initial_referring_domain%22%3A%20%22www.autogradr.com%22%2C%22%24email%22%3A%20%22abhinav%40skillspeed.com%22%2C%22%24name%22%3A%20%22Abhinav%22%7D; TawkConnectionTime=0; Tawk_58bda1655b89e2149e11fbf4=vs52.tawk.to::0; mp_mixpanel__c=0; __tawkuuid=e::app.autogradr.com::J3Cwn/5nvjFu/CENJ5xK9kFw6MUJtLKHYRnylbzwW/CvSJ1aO7GdsqXWiGKElm9f::2; __tawkuuid=e::autogradr.com::dyUQNmBfP+iwwiozzfrcwQRpEJNQ/GRgAL9Ru5ZoUTHnRk9BS4IdIYRCjiQBLbPp::2; __tawkuuid=e::app.autogradr.com::J3Cwn/5nvjFu/CENJ5xK9kFw6MUJtLKHYRnylbzwW/CvSJ1aO7GdsqXWiGKElm9f::2; user=eyJpZCI6NiwibmFtZSI6IkFiaGluYXYiLCJlbWFpbCI6ImFiaGluYXZAc2tpbGxzcGVlZC5jb20iLCJyb2xlIjoiSU5TVFJVQ1RPUiIsImlzQWN0aXZlIjp0cnVlLCJjb3Vyc2VzIjpbNyw0NCwzODldfQ==; Tawk_58bda1655b89e2149e11fbf4=vs72.tawk.to::0; session=MTUyMzM2NzE4M3xEdi1CQkFFQ180SUFBUkFCRUFBQUhmLUNBQUVHYzNSeWFXNW5EQVlBQkhWelpYSUZhVzUwTmpRRUFnQU18jV0a85IwI2m8ZwN8S8q8Xh06T3Bd8wLM5teRSCWw7YE=; mp_a599cdf67ec612d3f87e765c9a993f48_mixpanel=%7B%22distinct_id%22%3A%20%22162963cea9532a-0bde035d04000a-b34356b-100200-162963cea9736d%22%2C%22%24initial_referrer%22%3A%20%22http%3A%2F%2Fwww.autogradr.com%2F%3F%22%2C%22%24initial_referring_domain%22%3A%20%22www.autogradr.com%22%2C%22%24email%22%3A%20%22abhinav%40skillspeed.com%22%2C%22%24name%22%3A%20%22Abhinav%22%7D; TawkConnectionTime=0",
    'host': "app.autogradr.com",
    'cache-control': "no-cache",
    'postman-token': "d29da465-04ea-6ab6-649f-71baedcadcae"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)