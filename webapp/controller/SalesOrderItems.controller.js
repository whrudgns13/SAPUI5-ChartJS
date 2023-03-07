sap.ui.define([
    "./BaseController",
    "../lib/Chart",
    "es5/control/ChartJS"
], function(Controller) {
    'use strict';
    return Controller.extend("es5.controller.SalesOrderItems",{
        onInit : function(){
            const oView = this.getView();
            const oViewModel = new sap.ui.model.json.JSONModel({
                sales : [],
                salesOrderChart : {
                    title : "년도 별 오더 수량",
                    year : [],
                    group : [
                        {
                            key : "year",
                            text : "년도"
                        },
                        {
                            key : "month",
                            text : "달"
                        }
                    ],
                    data : {
                        labels : [],
                        datasets : [],
                    },
                    options : {}                    
                }
            });
            oView.setModel(oViewModel,"ViewModel");
            this.oViewModel = oView.getModel("ViewModel");
            
            this.oDataModel = this.getODataModel();           
            this.getRouter().attachRoutePatternMatched(this.onPattenMatched,this);
        },
        onPattenMatched : function(oEvent){
            const sProductId = oEvent.getParameter("arguments").productId;
            this.oViewModel.setProperty("/productId",sProductId);
            this.readOData(this.oDataModel,"SalesOrderLineItemSet",{
                filters : [new sap.ui.model.Filter("ProductID","EQ",sProductId)]    
            }).then(aSales=> {
                this.oViewModel.setProperty("/sales",aSales);
                const aYear = [...new Set(aSales.map(oSales=>oSales.DeliveryDate.getFullYear()))].map(year=>{
                    return {key : year, text : `${year}년`};
                });
                aYear.unshift({key : "all",text : "All"});
                this.oViewModel.setProperty("/salesOrderChart/year",aYear);
                this.defaultChart();
            })            
        },
        defaultChart : function(){
            const obj = {};
            const aSales = this.oViewModel.getProperty("/sales");
            aSales.forEach((sale)=>{
                const dDate = sale.DeliveryDate;
                const year = dDate.getFullYear();
                obj[year] ? obj[year]+=Number(sale.Quantity) : obj[year] = Number(sale.Quantity);
            });
            
            const oChartData = {
                labels : Object.keys(obj).map(sYear=>`${sYear}년`),
                datasets : [{
                    label : "년도 별 오더 수량",
                    data : Object.values(obj),
                    borderColor: 'rgb(0, 103, 181)',
                    backgroundColor : 'rgb(0, 103, 181)',
                    tension: 0.1
                }]
            };

            this.oViewModel.setProperty("/salesOrderChart/data",oChartData);
        },
        onChartDataChange : function(oEvent){
            const obj = {};            
            const sYear = oEvent.getSource().getSelectedKey();
            const aSales = this.oViewModel.getProperty("/sales");
            
            if(sYear==="all") return this.defaultChart();
            
            aSales.forEach(oSales=>{
                const dDate = oSales.DeliveryDate;
                const year = dDate.getFullYear();
                const month = dDate.getMonth()+1;
                if(year.toString()===sYear){
                    obj[month] ? obj[month]+=Number(oSales.Quantity) : obj[month] = Number(oSales.Quantity);
                }
            });

            const oChartData = {
                labels : Object.keys(obj).map(sMonth=>`${sMonth}월`),
                datasets : [{
                    label : `${sYear}년 오더수량`,
                    data : Object.values(obj),
                    borderColor: 'rgb(0, 103, 181)',
                    backgroundColor : 'rgb(0, 103, 181)',
                    tension: 0.1
                }]                
            };

            const oOptions =  {
                tooltips : {
                    callbacks : {
                        label: function(tooltipItem, data) {
                            console.log(tooltipItem,data);
                        },
                        title: function(tooltipItem, data) {
                            console.log(tooltipItem,data);
                        },
                        afterLabel : (tooltipItem,data)=>{
                            onsole.log(tooltipItem,data);
                        }
                    }
                }
            }
            
            this.oViewModel.setProperty("/salesOrderChart/data",oChartData);
            this.oViewModel.setProperty("/salesOrderChart/options",oOptions);
        }
    })
});