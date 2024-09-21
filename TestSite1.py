# -*- coding: utf-8 -*-
from flask import Flask, url_for, render_template, redirect, request

app = Flask(__name__)
app.secret_key = 'KIOSAJIASDUIASUISKOASKDLMADBHASD'


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        city = request.form.get('City')

        temperature = "15°C"
        description = "Ясно"

        return redirect(url_for('index', city=city, temperature=temperature, description=description))

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=False)