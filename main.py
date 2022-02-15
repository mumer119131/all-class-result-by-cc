import result_scrapper
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/<ag_num>")
def result(ag_num):
    response = jsonify(result_scrapper.result_scrapper(ag_num))

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)
