var autobahn = require('autobahn');
var beep = require('beepbeep');
var fs = require('fs');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({url: wsuri, realm: "realm1"});
var Poloniex = require('poloniex.js'),
// When using as an NPM module, use `require('poloniex.js')`
// Create a new instance, with optional API key and secret
//poloniex key 1
poloniex = new Poloniex('xxxxxxxxxx'); //old key
// poloniex = new Poloniex ('xxxxxxxxxxx'); // new key

indice_tradeID_ETH = 0;

var balance_btc=10000;
var alpha_buy = 1;
//init
var init_ETH=0.00000001;

// max_tendance
var max_tendance_ETH = 0.040818888;

//Targer Ratio ETH
var TargetRatioETH2hrs = 0.93;
var TargetRatioETH4hrs = 0.925;
var TargetRatioETH24hrs = 0.89;


//ETH function
var array_type_ETH = [];
var array_id_ETH =[];
var array_rate_ETH =[];
var array_amount_ETH = [];

var  most_recent_value_for_buy_array_ETH = [];
most_recent_value_for_buy_array_ETH[0] = init_ETH;
var RatioETH2h = 1 ;
var RatioETH4h = 1 ;
var RatioETH24h = 1 ;


var max_tradeID_ETH = 0;

var finited_time_array_ETH_2h = [];
var Max_in_2h_time_window_ETH = [];
Max_in_2h_time_window_ETH[0] = 1;

var finited_time_array_ETH_4h = [];
var Max_in_4h_time_window_ETH = [];
Max_in_4h_time_window_ETH[0] = 1;


var finited_time_array_ETH_24h = [];
var Max_in_24h_time_window_ETH = [];
Max_in_24h_time_window_ETH[0] = 1;


//INIT Time array ETH

for ( init = 0; init<14400; init++){ // 14400 car 2 h   = 14400 * 500ms // -4.4%
	finited_time_array_ETH_2h[init]=init_ETH;//intialisaion a init_ETH btc de toutes les cases ( demi secondes)
}


for ( init = 0; init<28800; init++){ // 28800 car 4 h   = 28800 * 500ms //-5.1%
	finited_time_array_ETH_4h[init]=init_ETH;//intialisaion a init_ETH btc de toutes les cases ( demi secondes)
}


for ( init = 0; init<172800; init++){ // 172800 car 24 h   = 172800 * 500ms//-8.7%
	finited_time_array_ETH_24h[init]=init_ETH;//intialisaion a init_ETH btc de toutes les cases ( demi secondes)
}



function findmax(aaa){ // max finder function
	  var max = 0,
	      a = aaa.length,
	      counter
	       for (counter=0;counter<a;counter++){
	          if (aaa[counter] > max){
	             max = aaa[counter]
	          }
	       }
	  return max
}



var unshift_array = setInterval (function() {  // delta finder, in the given time window


						finited_time_array_ETH_2h.unshift(most_recent_value_for_buy_array_ETH[0]);//enter value by the first place of the array
										Max_in_2h_time_window_ETH[0] = findmax(finited_time_array_ETH_2h);
						finited_time_array_ETH_2h.pop(); // supprime la derniere valeur du tableau
										RatioETH2h =  finited_time_array_ETH_2h[0]/Max_in_2h_time_window_ETH[0];


										finited_time_array_ETH_4h.unshift(most_recent_value_for_buy_array_ETH[0]);//enter value by the first place of the array
											Max_in_4h_time_window_ETH[0] = findmax(finited_time_array_ETH_4h);
										finited_time_array_ETH_4h.pop(); // supprime la derniere valeur du tableau
											RatioETH4h =  finited_time_array_ETH_4h[0]/Max_in_4h_time_window_ETH[0];

											finited_time_array_ETH_24h.unshift(most_recent_value_for_buy_array_ETH[0]);//enter value by the first place of the array
												Max_in_24h_time_window_ETH[0] = findmax(finited_time_array_ETH_24h);
												finited_time_array_ETH_4h.pop(); // supprime la derniere valeur du tableau
													RatioETH24h =  finited_time_array_ETH_24h[0]/Max_in_24h_time_window_ETH[0];




				//console.log(RatioXRP2h);
				//console.log(RatioETH2h);
				//console.log(ratio_SC);
},500);// resolution du tableau : 500ms







//**********************************************************************************************POLONIEX&API
//**********************************************************************************************POLONIEX&API

connection.onopen = function (session) {

	var en =0;
	var z = 0;
	var quantitybtc = 1;
	var quantity_currency =0;
	var buy_registered = 0;

//FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_
//FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_
//FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_FUNCTION_STREAM_RECEPTOR_


	function genericscan_buy_ETH(args,currency){
			for ( i =0; i<5 ; i++){
					if(args[i].data.type == 'sell'){
						 if(args[i].data.rate<max_tendance_ETH){
									most_recent_value_for_buy_array_ETH[0] = args[i].data.rate;
									console.log(most_recent_value_for_buy_array_ETH[0]);
							}
							else{ most_recent_value_for_buy_array_ETH[0] = max_tendance_ETH ;}//+++++++++++++++++
					}
			}
	}// END of FUNCTION GENERIC SCAN ETH


//BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_
//BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_BUY_ORDER_
/*
var closure_buy = setInterval(function () {

		if ((RatioETH2h<TargetRatioETH2hrs )||(RatioETH4h<TargetRatioETH4hrs)||(RatioETH24h<TargetRatioETH24hrs)){//SHOULD BE 0.95 max
	    if(RatioETH2h>0.5){
				if(alpha_buy==1){
					console.log("passed condition ETH");
	        var quantity_n = 0.9999*balance_btc/(finited_time_array_ETH_4h[0]*1);
					alpha_buy = 0;
					var buy_price_ETH = Number(finited_time_array_ETH_4h[0]*1.0002);
					 beep(8);
					
	      }
			}
		}


			//else {is RatioETH2h low enough ?}
alpha_buy = 1;
},2800);
*/

//RETURN_TRADE_HISTORY_RETURN_TRADE_HISTORY_RETURN_TRADE_HISTORY_RETURN_TRADE_HISTORY_RETURN_TRADE_HISTORY_RETURN_TRADE_HISTORY_

var indice_trade_history_ETH = 0;
/*
var history_check = setInterval ( function (){


							var timerETH = setTimeout (function(){
									poloniex.returnTradeHistory('BTC', 'ETH', function(err, data) {
	      						if (err) {/* handle error *//* }
	        					if ( typeof data  == 'object'){
	              					for (i=0; i<data.length ; i++){//************
	                							if(data[i].type == "buy"){
	                  							array_type_ETH[indice_trade_history_ETH] =  data[i].type;
	                  							array_id_ETH[indice_trade_history_ETH] = data[i].tradeID;
	                  					  	array_rate_ETH[indice_trade_history_ETH] = data[i].rate;
	                  							array_amount_ETH[indice_trade_history_ETH] = data[i].amount;
	                  							indice_trade_history_ETH++;
	                							}
	              					}
	            			}
	  							});
							},3000);







},25000);*/

//END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_
//END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_END_





	var time_display = setInterval(function(){
	  //console.log(sec);
	  console.log(modulo_sec);
	  selector_of_sell_order(modulo_sec);
	},1000);




	//**********************************************************************


		function ticker1ETH ( args, kwargs) {
			console.log("inside ticker1");
			var currency = 'ETH';
			genericscan_buy_ETH(args,currency);
		}


	session.subscribe('BTC_ETH', ticker1ETH);// call of the function named ticker1ETH + subscriion to stream.



}//close of on connection fonction ( with single argument session ).
//***********************************************************************
//**************************FINAL_CALL*****************************
//***********************************************************************
connection.open();
connection.onclose = function () {
		console.log("Websocket connection closed 2");
	}


							/*connection.close();*/

//*********************************************************lexique
//*********************************************************lexique
