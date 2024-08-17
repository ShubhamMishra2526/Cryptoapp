import { useEffect, useState } from "react";
import React from "react";
import "./styles.css";
import gradient from "../../../assets/gradient.jpeg";
import crypto from "../../../assets/crypto.jpeg";
/* importing framer motion with class name motion*/
import { motion } from "framer-motion";
import Button from "../../common/button";
import { Link } from "react-router-dom";
import { useWallet } from "../../wallet";

function MainComponent() {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1
          className="track-crypto-heading"
          /*using framer motion animation*/
          initial={{ opacity: 0, scale: 0.5, rotateX: "0deg" }}
          animate={{ opacity: 1, scale: 1, rotateX: "360deg" }}
          transition={{ duration: 0.8 }}
        >
          Crypto Portfolio
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, scale: 0.5, rotateX: "0deg" }}
          animate={{ opacity: 1, scale: 1, rotateX: "360deg" }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          Tracker
        </motion.h1>
        <motion.p
          className="slogan"
          initial={{ opacity: 0, scale: 0.5, rotateX: "0deg" }}
          animate={{ opacity: 1, scale: 1, rotateX: "360deg" }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Unleashing the Power of Decentralization
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {walletAddress && walletAddress.length > 0 ? (
            <Button text={"disconnectWallet"} onClick={disconnectWallet} />
          ) : (
            <Link to="/dashboard">
              <Button
                text={"Dashboard"}
                onClick={() => console.log("Btn clicked")}
              />
            </Link>
          )}

          {/* <Button text={"Connect Wallet"} outlined={true} /> */}
          {walletAddress && walletAddress.length > 0 ? (
            <Button
              text={`Connected: ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`}
              outlined={true}
              onClick={connectWallet}
            />
          ) : (
            <Button
              text={"Connect Wallet"}
              outlined={true}
              onClick={connectWallet}
            />
          )}
        </motion.div>
      </div>
      <div className="container">
        <motion.img
          src={crypto}
          className="crypto-img"
          /* adding animation to the imgs for infinite repetitions*/
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.img
          src={gradient}
          className="gradient-img"
          initial={{ x: -10 }}
          animate={{ x: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

export default MainComponent;
