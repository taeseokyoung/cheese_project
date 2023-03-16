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
        return render_template('member_detail1.html', member_num_give=member_num)
    elif member_num == 2:
        return render_template('member_detail2.html', member_num_give=member_num)
    elif member_num == 3:
        return render_template('member_detail3.html', member_num_give=member_num)
    elif member_num == 4:
        return render_template('member_detail4.html', member_num_give=member_num)
    elif member_num == 5:
        return render_template('member_detail5.html', member_num_give=member_num)
    else:
        return render_template('member_detail6.html', member_num_give=6)


@app.route('/popupd')
def popup_detail():
    member_num = request.args.get('member_num')
    object_id = request.args.get('object_id')

    return render_template('popup_detail.html', member_num_give=member_num, object_id_give=object_id)


@app.route('/popupe')
def popup_edit():
    member_num = request.args.get('member_num')
    object_id = request.args.get('object_id')
    return render_template('popup_edit.html', member_num_give=member_num, object_id_give=object_id)


@app.route('/popupp')
def popup_password():
    member_num = request.args.get('member_num')
    object_id = request.args.get('object_id')
    return render_template('popup_password.html', member_num_give=member_num, object_id_give=object_id)


@app.route("/visitor", methods=["POST"])
def add_guest_book():
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


@app.route("/card", methods=["POST"])
def add_card():
    member_num = request.form['member_num_give']
    card_title_receive = request.form['card_title_give']
    card_text_receive = request.form['card_text_give']
    card_img_receive = request.form['card_img_give']

    time_zone = pytz.timezone('Asia/Seoul')
    current_time = datetime.now(time_zone).strftime("%Y-%m-%d %H:%M")

    doc = {
        'card_title': card_title_receive,
        'card_text': card_text_receive,
        'card_img': card_img_receive,
        'time': current_time,
        'member_num': member_num
    }

    if member_num == '1':
        db.member_1.insert_one(doc)
    elif member_num == '2':
        db.member_2.insert_one(doc)
    elif member_num == '3':
        db.member_3.insert_one(doc)
    elif member_num == '4':
        db.member_4.insert_one(doc)
    elif member_num == '5':
        db.member_5.insert_one(doc)
    else:
        db.member_6.insert_one(doc)

    return jsonify({'msg': '등록 완료', 'reload': '1'})


@app.route("/card", methods=["GET"])
def get_card():
    member_num = request.args.get('num')

    if member_num == '1':
        target_db = db.member_1.find()
    elif member_num == '2':
        target_db = db.member_2.find()
    elif member_num == '3':
        target_db = db.member_3.find()
    elif member_num == '4':
        target_db = db.member_4.find()
    elif member_num == '5':
        target_db = db.member_5.find()
    else:
        target_db = db.member_6.find()

    card_list = []
    for doc in target_db:
        doc['_id'] = str(doc['_id'])
        card_list.append(doc)

    return jsonify({'card_list': card_list})


@app.route("/detail/<int:member_num>", methods=["POST"])
def check_password(member_num):
    # password_receive = request.form['password_give']

    # if password_receive == db.password.find_one({'member_num': member_num})['password']:
    return jsonify({'check': '1'})
    # else:
    #     return jsonify({'msg': '비밀번호가 일치하지 않습니다.', 'check': '0'})


@app.route("/detail/<int:member_num>", methods=["GET"])
def get_card_detail(member_num):
    object_id = request.args.get('object_id')

    if member_num == 1:
        temp_card = db.member_1.find_one({'_id': ObjectId(object_id)})
    elif member_num == 2:
        temp_card = db.member_2.find_one({'_id': ObjectId(object_id)})
    elif member_num == 3:
        temp_card = db.member_3.find_one({'_id': ObjectId(object_id)})
    elif member_num == 4:
        temp_card = db.member_4.find_one({'_id': ObjectId(object_id)})
    elif member_num == 5:
        temp_card = db.member_5.find_one({'_id': ObjectId(object_id)})
    else:
        temp_card = db.member_6.find_one({'_id': ObjectId(object_id)})

    temp_card['_id'] = str(temp_card['_id'])
    card = temp_card

    return jsonify({'card': card})


@app.route("/detail/<int:member_num>", methods=["PUT"])
def edit_card_detail(member_num, object_id):
    object_id = request.args.get('object_id')

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

        if member_num == 1:
            db.member_1.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        elif member_num == 2:
            db.member_2.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        elif member_num == 3:
            db.member_3.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        elif member_num == 4:
            db.member_4.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        elif member_num == 5:
            db.member_5.update_one({'_id': ObjectId(object_id)}, {'$set': doc})
        else:
            db.member_6.update_one({'_id': ObjectId(object_id)}, {'$set': doc})

        return jsonify({'msg': '수정 완료', 'reload': '1'})
    else:
        return jsonify({'msg': '비밀번호가 일치하지 않습니다.', 'reload': '0'})


@app.route("/detail/<int:member_num>", methods=["DELETE"])
def delete_card_detail(member_num, object_id):
    object_id = request.args.get('object_id')

    password_receive = request.form['password_give']

    if password_receive == db.password.find_one({'member_num': member_num})['password']:

        db.member_1.delete_one({'_id': ObjectId(object_id)})

        if member_num == 1:
            db.member_1.delete_one({'_id': ObjectId(object_id)})
        elif member_num == 2:
            db.member_2.delete_one({'_id': ObjectId(object_id)})
        elif member_num == 3:
            db.member_3.delete_one({'_id': ObjectId(object_id)})
        elif member_num == 4:
            db.member_4.delete_one({'_id': ObjectId(object_id)})
        elif member_num == 5:
            db.member_5.delete_one({'_id': ObjectId(object_id)})
        else:
            db.member_6.delete_one({'_id': ObjectId(object_id)})

        return jsonify({'msg': '삭제 완료', 'reload': '1'})
    else:
        return jsonify({'msg': '비밀번호가 일치하지 않습니다.', 'reload': '0'})


# 230316 서경이 방명록


@app.route("/guest", methods=["POST"])
def guest_post():
    comment_receive = request.form['comment_give']
    name_receive = request.form['name_give']
    time = datetime.now(pytz.timezone('Asia/Seoul')
                        ).strftime("%Y-%m-%d %H:%M:%S")

    # ("%Y-%m-%d %H:%M:%S %Z%z")
    doc = {
        'comment': comment_receive,
        'name': name_receive,
        'time': time
    }
    db.guestbook.insert_one(doc)

    return jsonify({'msg': '저장 완료!'})


@app.route("/guest", methods=["GET"])
def guest_get():
    guestbook_data = list(db.guestbook.find({}, {'_id': False}))
    return jsonify({'result': guestbook_data})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
