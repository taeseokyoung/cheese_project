import pytz
from datetime import datetime
from bson import ObjectId
import certifi
from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


ca = certifi.where()
client = MongoClient(
    'mongodb+srv://cheeseDB:20230313@cheese.glvlzhn.mongodb.net/cheese?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.cheeseDB


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/<int:member_num>')
def detail_page(member_num):
    if member_num == 1:
        return render_template('member1_detail.html', member_num=member_num)
    elif member_num == 2:
        return render_template('member2_detail.html', member_num=member_num)
    elif member_num == 3:
        return render_template('member3_detail.html', member_num=member_num)
    elif member_num == 4:
        return render_template('member4_detail.html', member_num=member_num)
    else:
        return render_template('member5_detail.html', member_num=member_num)


@app.route("/visitor", methods=["POST"])
def save_guest_book():
    visitor_receive = request.form['visitor_give']
    guest_book_receive = request.form['guest_book_give']

    time_zone = pytz.timezone('Asia/Seoul')
    current_time = datetime.now(time_zone).strftime("%m-%d %H:%M")

    doc = {
        'visitor': visitor_receive,
        'guest_book': guest_book_receive,
        'visit_time': current_time
    }
    db.visitor.insert_one(doc)

    return jsonify({'msg': '작성 완료'})


@app.route("/visitor", methods=["GET"])
def get_guest_book():
    guest_book_list = list(db.visitor.find({}, {'_id': False}))

    return jsonify({'guest_book_list': guest_book_list})


@app.route("/card/<int:member_num>", methods=["POST"])
def save_card(member_num):
    card_title_receive = request.form['card_title_give']
    card_text_receive = request.form['card_text_give']
    card_img_receive = request.form['card_img_give']
    password_receive = request.form['password_give']

    if password_receive == db.password.find_one({'member_num': member_num})['password']:
        doc = {
            'card_title': card_title_receive,
            'card_text': card_text_receive,
            'card_img': card_img_receive,
            'member_num': member_num
        }
        db.member+member_num.insert_one(doc)
        return jsonify({'msg': '등록 완료'})
    else:
        return jsonify({'msg': '비밀번호가 일치하지 않습니다.'})


@app.route("/card/<int:member_num>", methods=["GET"])
def get_card(member_num):
    card_list = []
    for doc in db.member+member_num.find():
        doc['_id'] = str(doc['_id'])
        card_list.append(doc)

    return jsonify({'card_list': card_list})


@app.route("/detail/<int:member_num>/<string:object_id>", methods=["GET"])
def get_card_detail(member_num, object_id):
    card = db.member+member_num.find_one({'_id': ObjectId(object_id)})

    return jsonify({'card': card})


@app.route("/detail/<int:member_num>/<string:object_id>", methods=["PUT"])
def edit_card_detail(member_num, object_id):
    card_title_receive = request.form['card_title_give']
    card_text_receive = request.form['card_text_give']
    card_img_receive = request.form['card_img_give']
    password_receive = request.form['password_give']

    if password_receive == db.password.find_one({'member_num': member_num})['password']:
        doc = {
            'card_title': card_title_receive,
            'card_text': card_text_receive,
            'card_img': card_img_receive,
            'member_num': member_num
        }
        db.member + \
            member_num.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        return jsonify({'msg': '수정 완료'})
    else:
        return jsonify({'msg': '비밀번호가 일치하지 않습니다.'})
