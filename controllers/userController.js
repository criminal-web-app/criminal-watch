'use strict';

const mysql             =   require('anytv-node-mysql');
const util              =   require('./../helpers/util');
                            require('./../config/err_config');
const uuidv4            = require('uuid/v4');

const user  = {
    first_name   : '',
    last_name    : '',
    username    : '',
    email       : '',
    password    : '',
    phone_number : '',
    _role_id      : ''
}



const getUsers = (req,res,next)=>{

    function start(){
        mysql.use('master')
        .query(
            `SELECT * FROM users`,
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){

        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'No results found',
                context : ZERO_RES
            }).status(404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}

const getUserById = (req,res,next)=>{

    function start(){
        const {
            id
        } = req.params.id;
        mysql.use('master')
        .query(
            `SELECT * FROM users WHERE id = ${id}`,
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){

        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'No results found',
                context : ZERO_RES
            }).status(404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}


const createUser = (req,res,next)=>{
    const data = util._get
    .form_data(user)
    .from(req.body);

    function start(){
        if(data instanceof Error){
            return res.json({
                message : data.message,
                context : INC_DATA
            })
            .status(500);
        }
        data.id = uuidv4();
        data.created = new Date();
        data.role_id = data.role_id? data.role_id : null;
        mysql.use('master')
            .query(`INSERT INTO users(first_name,last_name,username,email,password,phone_number,role_id,created,updated)\
                    VALUES (${data.id},\
                            ${data.first_name},\
                            ${data.last_name},\
                            ${data.username},\
                            ${data.email},\
                            ${data.password},\
                            ${data.phone_number},\
                            ${data.role_id},\
                            NOW(),\
                            ${null})`,
                // [
                //     uuidv4,
                //     data.first_name,
                //     data.last_name,
                //     data.username,
                //     data.email,
                //     data.password,
                //     data.phone_number,
                //     data.role_id,
                //     data.created,
                //     null
                // ],
                send_response
            )
            .end();
    }

    function send_response(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.affectedRows){
            return res.json({
                message : 'Error creating user',
                context : NO_RECORD_CREATED
            })
            .status(400);
        }

        return res.json({
            data : {
                firstName : data.firstName,
                lastName : data.lastname,
                username : data.lastName,
                email : data.email,
                role : data.role,
                created : data.created
            },
            message : 'Success'
        })
        .status(200)
        .send();
    }

    start();
}


module.exports = {
    getUsers,
    getUserById,
    createUser
}