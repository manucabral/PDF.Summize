import flask
import PyPDF2
import os

app = flask.Flask(__name__)


@app.route("/")
def index():
    return flask.jsonify({"About": "PDF.Summize API"})


@app.route("/convert", methods=["POST"])
def ppdf():
    file = flask.request.files["file"]
    if not file:
        return flask.jsonify({"error": "No file provided"})
    if not file.filename.endswith(".pdf"):
        return flask.jsonify({"error": "Invalid file type"})
    pdf = PyPDF2.PdfReader(file)
    res = {"num_pages": len(pdf.pages), "content": []}
    for i in range(len(pdf.pages)):
        res["content"].append({"page": i, "text": pdf.pages[i].extract_text()})
    del pdf
    return flask.jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)
