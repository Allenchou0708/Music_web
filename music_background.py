from http import client
from flask import Flask
from flask import request
from flask import redirect
from flask import render_template
from flask import session
from pymongo import MongoClient
from flask import session
import time

myweb=Flask(__name__,static_url_path="/")

myweb.secret_key="133221333123111"



@myweb.route("/test_test")
def test_test():
    global_client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    global_db=global_client.Music_Website
    global_collect=global_db.Musics
    global_curser=global_collect.find({"read_me":{"$exists":False}})
    
    return_string=""
    for i in global_curser:
        del i["_id"]
        return_string+=str(i)
        return_string+="\n"
    
    return return_string.replace("'",'"')

@myweb.route("/")
def root():
    
    # if session.get("user_name")==False or time.time()-session["last-login"]>=600.0: 
    #     session["user_name"]=False

    return render_template("homepage.html")

@myweb.route("/headline")
def headline():
    with open("headline.txt","r",encoding="utf-8") as file:
        return  file.read()

@myweb.route("/system_article")
def system_article():
    with open("system_article.txt","r",encoding="utf-8") as file:
        return  file.read()

@myweb.route("/system_article_link")
def system_article_link():
    with open("system_article_link.txt","r",encoding="utf-8") as file:
        return  file.read()


@myweb.route("/about_us_page")
def about_us():
    return render_template("about_us_page.html")

@myweb.route("/music_page")
def music_page():
    sorting_type=request.args.get("type")
    classes=request.args.get("class")
    page=request.args.get("page")
    page=int(page)
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.Musics
    
    if classes != None :
        curser=collect.find({"read_me":{"$exists":False}}).sort("publish-time",-1)
        current=-1
        request_information=[]
        for i in curser:
            print(i["label"])
            if  i["label"].find(classes) != -1:
                current+=1
                if current>=(10*(page-1)) and current<(10*page):
                    del i["_id"]
                    request_information.append(i)
  
        total_page=current//10+1

        if page-1 <=0:
            former=""
        else: former="http://127.0.0.1:5000/music_page?type=%E6%9C%80%E6%96%B0&page="+str(page-1)
        if page+1 > total_page:
            after=""
        else: after="http://127.0.0.1:5000/music_page?type=%E6%9C%80%E6%96%B0&page="+str(page+1)

        if former != "" and after!="":
            return render_template("music_page_A.html",musics=request_information,page=page,last_page=former,next_page=after)
        elif former!="" and after=="":
            return render_template("music_page_A.html",musics=request_information,page=page,last_page=former)
        elif former=="" and after!= "":
            return render_template("music_page_A.html",musics=request_information,page=page,next_page=after)
        elif former=="" and after=="":
            return render_template("music_page_A.html",musics=request_information,page=page)
   

    number_detail=collect.find_one({"read_me":-3})
    total_page=number_detail["total"]//10+1
    if number_detail["total"]%10 ==0:
        total_page-=1

    if sorting_type=="最新":
        curser=collect.find({"read_me":{"$exists":False}}).sort("publish-time",-1)
        current=0
        request_information=[]
        for i in curser:
            if current>10*page:
                break
            if current>=(10*(page-1)) and current<(10*page):
                del i["_id"]
                request_information.append(i)
            current+=1
        
        if page-1 <=0:
            former=""
        else: former="http://127.0.0.1:5000/music_page?type=%E6%9C%80%E6%96%B0&page="+str(page-1)
        if page+1 > total_page:
            after=""
        else: after="http://127.0.0.1:5000/music_page?type=%E6%9C%80%E6%96%B0&page="+str(page+1)

        if former != "" and after!="":
            return render_template("music_page_A.html",musics=request_information,page=page,last_page=former,next_page=after)
        elif former!="" and after=="":
            return render_template("music_page_A.html",musics=request_information,page=page,last_page=former)
        elif former=="" and after!= "":
            return render_template("music_page_A.html",musics=request_information,page=page,next_page=after)
        elif former=="" and after=="":
            return render_template("music_page_A.html",musics=request_information,page=page)
    elif sorting_type=="最舊":
        curser=collect.find({"read_me":{"$exists":False}})
        current=0
        request_information=[]
        for i in curser:
            if current>10*page:
                break
            if current>=(10*(page-1)) and current<(10*page):
                del i["_id"]
                request_information.append(i)
            current+=1

        if page-1 <=0:
            former=""
        else: former="http://127.0.0.1:5000/music_page?type=最舊&page="+str(page-1)
        if page+1 > total_page:
            after=""
        else: after="http://127.0.0.1:5000/music_page?type=最舊&page="+str(page+1)

        if former != "" and after!="":
            return render_template("music_page_B.html",musics=request_information,page=page,last_page=former,next_page=after)
        elif former!="" and after=="":
            return render_template("music_page_B.html",musics=request_information,page=page,last_page=former)
        elif former=="" and after!= "":
            return render_template("music_page_B.html",musics=request_information,page=page,next_page=after)
        elif former=="" and after=="":
            return render_template("music_page_B.html",musics=request_information,page=page)
    # elif sorting_type=="最熱門":
    #     return render_template("music_page_C.html",musics=request_information)

@myweb.route("/enroll")
def enroll():
    return render_template("enroll_page.html")
# @myweb.route("/")
# def determin():

@myweb.route("/database")
def database():
    name=request.args.get("user_name")
    passwd=request.args.get("passwd")
    email=request.args.get("email")
    card_number=request.args.get("card_number")

    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.normal_client
    curser=collect.find({"read_me":{"$exists":False}})
    for i in curser:
        if i["email"] == email:
            print("alert")
            return redirect("/warning?error=這隻電子郵件已經被註冊過囉")
    
    number_file=collect.find_one({"read_me":-2})
    total_number=number_file["total"]
    collect.insert_one({
        "id":total_number+1,
        "name":name,
        "password":passwd,
        "email":email,
        "card_number":card_number
    })
    collect.update_one({"read_me":-2},{
        "$inc":{
            "total":1
        }
    })
    return redirect("/")

@myweb.route("/warning")
def email_repeat():
    error_type=request.args.get("error")
    return render_template("Warning.html",warning_word=error_type)  

# @myweb.route("/check_detail")
# def check_detail():
    # name=request.args.get("")
    # passwd=request.args.get("")
    # email=request.args.get("")
    # card_number=request.args.get("")

#     return render_template("check_detail_page.html",say_hi=string)

@myweb.route("/determin")
def determin():
    name=request.args.get("account")
    password=request.args.get("passwd")
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.normal_client
    user_curser=collect.find({
        "$and":[
            {"name":name},
            {"password":password}
        ]
    })
    exist=0
    id=0
    for i in user_curser:
        id=i["id"]
        exist+=1
    if exist==0:
        return redirect("/warning?error=the account and the password can't corresponse")
    else: 
        session["user_name"]=name
        session["last-login"]=time.time()
        return redirect("/personpage?id="+str(id))
    
@myweb.route("/personpage")
def personpage():
    id=request.args.get("id")
    id=int(id)
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.normal_client
    user_data=collect.find_one({"id":id})
    return render_template("personpage.html",user_name=user_data["name"],user_email=user_data["email"])

@myweb.route("/logout")
def logout():
    session["user_name"]=False
    return redirect("/Inform?information=您已成功登出")

@myweb.route("/publish")
def publish():
    if session.get("user_name")==False:
        return redirect("/warning?error=You Should Sign in first for publish the article")
    else: return render_template("Publish.html")
    
@myweb.route("/publish_music")
def music():
    return render_template("Publish_Music.html")

@myweb.route("/database_music")
def database_music():
    music_name=request.args.get("music_name")
    author_name=request.args.get("author_name")
    introduction=request.args.get("introduction")
    label=request.args.get("label")
    url=request.args.get("url")
    
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.Musics

    print("1st database")
    id_number=collect.find_one({"read_me":-3})
    id_number=id_number["total"]
    collect.insert_one({
        "id":id_number,
        "music_name":music_name,
        "author_name":author_name,
        "sharing_people":session.get("user_name"),
        "introduction":introduction,
        "label":label,
        "url":url,
        "photo":"None",
        "publish-time":time.time(),
        "super_link":"/music_article?id="+str(id_number)
    })
    collect.update_one({"read_me":-3},{
        "$inc":{
            "total":1
        }
    })
    return redirect("/Inform?information=我們已經收到您的推薦歌曲")



@myweb.route("/publish_news")
def publish_news():
    return render_template("Publish_News.html")

@myweb.route("/database_news")
def database_news():
    news_name=request.args.get("news_name")
    introduction=request.args.get("introduction")
    label=request.args.get("label")
    
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.News

    id_number=collect.find_one({"read_me":-3})
    id_number=id_number["total"]
    collect.insert_one({
        "id":id_number,
        "news_name":news_name,
        "sharing_people":session.get("user_name"),
        "introduction":introduction,
        "label":label,
        "photo":"None",
        "publish-time":time.time()
    })
    collect.update_one({"read_me":-3},{
        "$inc":{
            "total":1
        }
    })
    return redirect("/Inform?information=我們已經收到您的推薦新聞")

@myweb.route("/publish_goods")
def publish_goods():
    return render_template("Publish_Goods.html")

@myweb.route("/database_goods")
def database_goods():
    goods_name=request.args.get("goods_name")
    price=request.args.get("price")
    introduction=request.args.get("introduction")
    label=request.args.get("label")
    
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.Goods

    id_number=collect.find_one({"read_me":-3})
    id_number=id_number["total"]
    collect.insert_one({
        "id":id_number,
        "goods_name":goods_name,
        "price":price,
        "sharing_people":session.get("user_name"),
        "introduction":introduction,
        "label":label,
        "photo":"None",
        "publish-time":time.time()
    })
    collect.update_one({"read_me":-3},{
        "$inc":{
            "total":1
        }
    })
    return redirect("/Inform?information=我們已經收到您的商品")

@myweb.route("/publish_discussion")
def publish_discussion():
    return render_template("Publish_Discussion.html")

@myweb.route("/database_discussion")
def database_discussion():
    discussion_name=request.args.get("discussion_name")
    introduction=request.args.get("introduction")
    label=request.args.get("label")
    
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.Musics

    id_number=collect.find_one({"read_me":-3})
    id_number=id_number["total"]
    collect.insert_one({
        "id":id_number,
        "discussion_name":discussion_name,
        "sharing_people":session.get("user_name"),
        "introduction":introduction,
        "label":label,
        "photo":"None",
        "publish-time":time.time()
    })
    collect.update_one({"read_me":-3},{
        "$inc":{
            "total":1
        }
    })
    return redirect("/Inform?information=我們已經收到您的文章")

@myweb.route("/Inform")
def Inform():
    info=request.args.get("information")
    return render_template("informpage.html",information=info)

@myweb.route("/music_article")
def music_article():
    id=request.args.get("id")
    id=int(id)
    
    client=MongoClient("mongodb+srv://root:sS23109950@my2db.e8neluy.mongodb.net/?retryWrites=true&w=majority")
    db=client.Music_Website
    collect=db.Musics
    data_dic=collect.find_one({"id":id})
    
    music_name=data_dic["music_name"]
    author_name=data_dic["author_name"]
    sharing_people=data_dic["sharing_people"]
    introduction=data_dic["introduction"]
    url=data_dic["url"]

    return render_template("Introduction.html",music_name=music_name,author_name=author_name,sharing_people=sharing_people,introduction=introduction,url=url)

# @myweb.route("/comment_determin")
# def comment_determin():
#     if session.get("user_name")==False:
#         return redirect("/warning?error=You Should Sign in first for  comment the article")
#     else: 
#         comment=request.args.get("comment")

#         redirect("/Inform?information=我們已經收到您的評論")

if __name__ == "__main__":
    myweb.run()