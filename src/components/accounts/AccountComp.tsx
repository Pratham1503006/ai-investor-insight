import { Button } from "@/components/ui/button";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Component } from "./Gaugebar";

const AccountComp: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
      
            <main className="flex-1 bg-gradient-to-b from-background to-accent/20">
                
                <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold mb-1 mt-6">Account</h1>

                </div>
                </div>

                <div style={{backgroundColor: "white", width: "1200px", height: "200px", margin: "auto", borderRadius: "20px", border: "2px solid #dddddd"}}>
                    <div className="p-8 ml-12">
                        <p style={{color: "gray"}}>Name</p>
                        <p className="font-sans text-4xl font-normal">Shriman Dasadiya</p>
                    </div>
                    <Component title="Profit"/>
                </div>

                <div style={{flexWrap: "wrap", display: "flex", marginTop: "120px", backgroundColor: "white", width: "1200px", height: "200px", margin: "auto", borderRadius: "20px", border: "2px solid #dddddd"}}>
                    <div className="p-4 ml-16">
                        <p style={{color: "gray"}}>Email</p>
                        <p className="font-sans text-2xl font-normal">shrimandasadiya123@gmail.com</p>
                    </div>
                    
                    <div className="pt-4 pl-24">
                        <p style={{color: "gray"}}>Phone Number</p>
                        <p className="font-sans text-2xl font-normal">+918849078723</p>
                    </div>
                    <div className="pt-4 pl-28">
                        <p style={{color: "gray"}}>Alternate Phone Number</p>
                        <p className="font-sans text-2xl font-normal">+918849078723</p>
                    </div>

                    <div className="-mt-8 ml-20">
                        <p style={{color: "gray"}}>Address</p>
                        <p className="font-sans text-2xl font-normal">A2-703, Adani-Realty Aangan, Shantigram, Nr. Vaishnodevi Circle, Ahmedabad-382421</p>
                    </div>
                </div>

                <div style={{flexWrap: "wrap", display: "flex", backgroundColor: "white", width: "1200px", height: "200px", margin: "24px auto 40px auto", borderRadius: "20px", border: "2px solid #dddddd"}}>
                    <div className="p-4 ml-16 mr-8">
                        <p style={{color: "gray"}}>Account ID</p>
                        <p className="font-sans text-2xl font-normal">230121</p>
                    </div>
                    
                    <div className="pt-4 pl-48">
                        <p style={{color: "gray"}}>BO ID</p>
                        <p className="font-sans text-2xl font-normal">478264916323344</p>
                    </div>
                    <div className="pt-4 pl-64 pr-36">
                        <p style={{color: "gray"}}>CKYC ID</p>
                        <p className="font-sans text-2xl font-normal">921747385201358</p>
                    </div>

                    <div className="ml-20 mr-16">
                        <p style={{color: "gray"}}>DEMAT ID</p>
                        <p className="font-sans text-2xl font-normal">28301294</p>
                    </div>

                    <div className="pl-40 mr-32">
                        <p style={{color: "gray"}}>DP ID</p>
                        <p className="font-sans text-2xl font-normal">38728227</p>
                    </div>
                    <div className="pl-36 ml-16">
                        <p style={{color: "gray"}}>Depository & Broker</p>
                        <p className="font-sans text-2xl font-normal">NSDL & myRupee Pvt. Ltd.</p>
                    </div>
                    
                </div>

{/**                                            */}


                {/* <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-700">Name</h4>
                        <p className="text-gray-600">ABC XYZ</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-700">Account ID</h4>
                        <p className="text-gray-600">123456</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-700">CKYC ID</h4>
                        <p className="text-gray-600">123456</p>
                        <p>Email</p>
                        <p>BO ID</p>
                        <p>Phone Number</p>
                        <p>Alternative Phone Number:</p>
                        <p>Nomination</p>
                        <p>Segments Traded</p>
                        <p>Yearly Revenue</p>
                        <p>Profit(this year): </p>
                        <p>Profit(Overall): </p>
                    </div>
                </div> */}
                
            </main>
        </div>
    )
}

export default AccountComp;