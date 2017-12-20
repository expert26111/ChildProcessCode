/**
 * Created by Yoana on 12/19/2017.
 */
const SHA256 = require('crypto-js/sha256');
const express = require("express");
const bodyParser = require('body-parser');
var WebSocket = require("ws");
var cp = require('child_process');

var nonce = 200;
var difficulty = 3;
//var previousHash = '';
//this piece needs to accept Block data

       function _calculateHash(index,previousHash, timestamp, data ,nonce )
        {
            return SHA256(index + previousHash + timestamp + JSON.stringify(data) + nonce).toString();
        }

process.on('message', function(block)
{
         console.log(JSON.stringify(block,null,4));

          while(block.hash.substring(0,difficulty)!== Array(difficulty + 1).join("0"))
         {
            nonce++;
            block.hash  = _calculateHash(block.index,block.previousHash , block.timestamp, block.data, nonce);
         }
         console.log("Blocked mine : "+block.hash);

        // Do work  (in this case just up-case the string
    // m = m.toUpperCase();

    // Pass results back to parent process
         process.send(block);
});





