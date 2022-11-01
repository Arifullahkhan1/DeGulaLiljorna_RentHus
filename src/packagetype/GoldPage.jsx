import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import "./GoldPage.css"


export default function GoldPage() {
    const [bokings,setBokings]= useState([
        {
            userId:1,
            userName:'salah',
            userMail:'salah@gmail.com',
            userPhone:'070123456',
            useradress:'stgatan33',
            clenarId:1,
        }

        ]);

        const bokingList=bokings.map(boking=> 
    
            <div className="card">
                <span className="span"> Your tiket</span>
                <div >
                    <li>name:{boking.userName}</li>
                    <li>mail:{boking.userMail}</li>
                    <li>phone:{boking.userPhone}</li>
                    <li>adress:{boking.useradress}</li>
                    <li>clenarName:{boking.clenarId}</li>
                    
                </div>
            
            </div>
            
            
        )

        return <div>{bokingList}</div>;
        
}

