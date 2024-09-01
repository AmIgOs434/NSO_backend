const uuid = require('uuid')
const path = require('path');
const { Skladi,Skladi_tseli,Statya,Statya_item,Skladi_tsifri,Skladi_photo,Skladi_raboti } = require('../models/models')
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')


const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
     
  host: 'smtp.mail.ru',
  port:465,
  secure : true,
  auth: {
      user: 'nso-sms@mail.ru',
      pass: 'qgEwTnVAGA1bi0WFYhj3'
  }
});

const sendSMS = async(tema,name,phone,kompany,info) => {
  await transporter.sendMail({
    from: 'nso-sms@mail.ru',
    to: 'info.nso@inbox.ru',
    subject : tema,
    html: `<div>Имя : ${name}</div> <br/> <div>Телефон : ${phone}</div><br/> <div>Название компании : ${kompany}</div> <br/><div>Информация о компании : ${info}</div>`,

  })
}

const postMessage2 = async(tema,name,phone,summa,ploshad,type_sklad,inz_izisk,avt_nadzor,tech_nadzor,naruzn_sety,vnutriplosh) => {
  await transporter.sendMail({
    from: 'nso-sms@mail.ru',
    to: 'info.nso@inbox.ru',
    subject : tema,
    html: `<div>Имя : ${name}</div> <br/> <div>Телефон : ${phone}</div><br/> <div>Получившаяся сумма : ${summa}</div> <br/><div>Площадь склада : ${ploshad}</div> <br/><div>Тип склада : ${type_sklad}</div><br/><div>Инженерные изыскания : ${inz_izisk}</div> <br/><div>Авторский надзор: ${avt_nadzor}</div> <br/><div> Технический надзор : ${tech_nadzor}</div> <br/><div>Наружние сети : ${naruzn_sety}</div> <br/><div>Внутриплощадочные сети : ${vnutriplosh}</div>`,

  })
}

const postMessage3 = async(name,phone,comment,tema) => {
  await transporter.sendMail({
    from: 'nso-sms@mail.ru',
    to: 'info.nso@inbox.ru',
    subject : tema,
    html: `<div>Имя : ${name}</div> <br/> <div>Телефон : ${phone}<br/> <div>Комментарий : ${comment}` ,

  })
}

const postMessage4 = async(name,phone,comment,file) => {
  await transporter.sendMail({
    from: 'nso-sms@mail.ru',
    to: 'info.nso@inbox.ru',
    subject : 'Пригласить NSO на участие в тендере',
    html: `<div>Имя : ${name}</div> <br/> <div>Телефон : ${phone}<br/> <div>Комментарий : ${comment} <br/> <div>Ссылка на файл : https://nso-construct.ru:8443/${file}` ,

  })
}

class deviceController {

    async postMessage(req, res) {
        const {tema,name,phone,kompany,info} = req.body
       const sms = await sendSMS(tema,name,phone,kompany,info)
        return res.json(sms)
    }

    async postMessage1(req, res) {
        const {tema,name,phone,summa,ploshad,type_sklad,inz_izisk,avt_nadzor,tech_nadzor,naruzn_sety,vnutriplosh} = req.body
       const sms = await postMessage2(tema,name,phone,summa,ploshad,type_sklad,inz_izisk,avt_nadzor,tech_nadzor,naruzn_sety,vnutriplosh)
        return res.json(sms)
    }
    
    async postMessage22(req, res) {
        const {name,phone,comment,tema} = req.body
       const sms = await postMessage3(name,phone,comment,tema)
        return res.json(sms)
    }

    async postMessage23(req, res) {

        const {name,phone,comment} = req.body
       const {file} = req.files
             
        let fileName = uuid.v4() 
        file.mv(path.resolve(__dirname, '..', 'static', fileName))
 const sms = await postMessage4(name,phone,comment,fileName)
         return res.json(sms)
    }
    
      async getallSklad (req, res) {
    
    const user = await Skladi.findAll(
        {
            include: [
                {model: Skladi_tseli, as: 'Skladi_tseli'},
                {model: Skladi_tsifri, as: 'Skladi_tsifri'},
                {model: Skladi_photo, as: 'Skladi_photo'},
                {model: Skladi_raboti, as: 'Skladi_raboti'}
            ],

        },
    )
    return res.json(user)
}

      async getStatya (req, res) {
      const {name} = req.body

    const user = await Statya.findOne(
        {
            where:{
                name1:name
            },
            include: [
                {model: Statya_item, as: 'Statya_item'},
            ],

        },
    )
    return res.json(user)
}


      async getallSklad_abch (req, res) {
    
    const user = await Skladi.findAll(
        {
            include: [
                {model: Skladi_tseli, as: 'Skladi_tseli'},
                {model: Skladi_tsifri, as: 'Skladi_tsifri'},
                {model: Skladi_photo, as: 'Skladi_photo'},
                {model: Skladi_raboti, as: 'Skladi_raboti'}
            ],
            where:{
                type:2
            }

        },
    )
    return res.json(user)
}

      async getallSklad_simple (req, res) {
    
    const user = await Skladi.findAll(
        {
            include: [
                {model: Skladi_tseli, as: 'Skladi_tseli'},
                {model: Skladi_tsifri, as: 'Skladi_tsifri'},
                {model: Skladi_photo, as: 'Skladi_photo'},
                {model: Skladi_raboti, as: 'Skladi_raboti'}
            ],
            where:{
                type:1
            }

        },
    )
    return res.json(user)
}



    async getOneSklad(req, res) {
        const deviceSize = await Skladi.findOne(
            {
                where: {   
                    trans:req.body.id
                },
                     include: [
                {model: Skladi_tseli, as: 'Skladi_tseli'},
                {model: Skladi_tsifri, as: 'Skladi_tsifri'},
                {model: Skladi_photo, as: 'Skladi_photo'},
                {model: Skladi_raboti, as: 'Skladi_raboti'}
            ],
            },
        )
        return res.json(deviceSize)
    }
    
    
    
    
    
    
    
    
    
async createskladi(req, res) {
  const {Name,Nmae1,nachalo,m,konets,ploshad,oblast,adres,type,id} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
  const images = `https://nso-construct.ru:8443/${fileName}`
  const Sklad1i = await Skladi.create({
    id:id,
    Name:Name,
    Nmae1:Nmae1,
    nachalo:nachalo,
    konets:konets,
    ploshad:ploshad,
    photo:images,
    oblast:oblast,
    adres:adres,
    type:type,
    m:m,
  });

  return res.json(Sklad1i)
}



async createskltseli(req, res) {
  const {title,SkladiId,id} = req.body
  
  const Skladi = await Skladi_tseli.create({
       id:id,
    title:title,
    SkladiId:SkladiId,
  });

  return res.json(Skladi)
}

async createskladitsifri(req, res) {
  const {title,SkladiId,desk,id} = req.body
  
  const Skladi = await Skladi_tsifri.create({
       id:id,
    desk:desk,
    title:title,
    SkladiId:SkladiId,
  });

  return res.json(Skladi)
}
async createskrabotii(req, res) {
  const {title,SkladiId,id} = req.body
  
  const Skladi = await Skladi_raboti.create({
       id:id,
    title:title,
    SkladiId:SkladiId,
  });

  return res.json(Skladi)
}

async createphoto(req, res) {
  const {SkladiId,id} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
  const images = `https://nso-construct.ru:8443/${fileName}`
  const Sklad1i = await Skladi_photo.create({
       id:id,
    photo:images,
    SkladiId:SkladiId,
  });

  return res.json(Sklad1i)
}
}
module.exports = new deviceController()