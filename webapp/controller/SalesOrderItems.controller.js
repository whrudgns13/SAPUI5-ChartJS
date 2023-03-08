sap.ui.define([
    "./BaseController",
    "../lib/Chart",
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
                    selectedKey : "all",
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
                this.onChartDataChange();
            })            
        },
        onChartDataChange : function(){
            const sSelectedKey = this.oViewModel.getProperty("/salesOrderChart/selectedKey");
            const oChartData = this.createChartData(sSelectedKey);
            const aValue = Object.values(oChartData);
            const oChart = {
                labels : Object.keys(oChartData).map(sDate=> `${sDate}${sSelectedKey==="all" ? '년' : '월'}`),
                datasets : [{
                    label : `${sSelectedKey==="all" ? '총' : sSelectedKey}년도 오더수량`,
                    data : aValue.map(data=>data.quantity),
                    amount : aValue.map(data=>data.amount),
                    borderColor: 'rgb(0, 103, 181)',
                    backgroundColor : 'rgb(0, 103, 181)',
                    tension: 0.1
                }]                
            };

            const oChartOptions =  {
                plugins : {
                    tooltip : {
                        enabled: true,
                        callbacks : {
                            title: () => '',
                            label: tooltipItem => {
                                return ` ${tooltipItem.label} 오더수량 ${tooltipItem.dataset.data[tooltipItem.dataIndex]}`;
                            },
                            afterLabel : tooltipItem => {
                                return ` 총액 ${Math.floor(tooltipItem.dataset.amount[tooltipItem.dataIndex])}`;
                            }
                        }
                    }
                }                
            };
            
            this.oViewModel.setProperty("/salesOrderChart/data",oChart);
            this.oViewModel.setProperty("/salesOrderChart/options",oChartOptions);
        },
        createChartData : function(sSelectedKey){
            const oChartData = {};
            const aSales = this.oViewModel.getProperty("/sales");         
            
            aSales.forEach(oSales=>{
                const dDate = oSales.DeliveryDate;
                const iYear = dDate.getFullYear();
                const iMonth = dDate.getMonth()+1;
                const chartDataStructure = (sDate) => {
                    if(oChartData[sDate]){
                        oChartData[sDate].quantity+=Number(oSales.Quantity);
                        oChartData[sDate].amount+=Number(oSales.GrossAmount);
                        return;
                    }

                    oChartData[sDate] = {
                       quantity : Number(oSales.Quantity),
                       amount : Number(oSales.GrossAmount)
                    };
                };

                if(sSelectedKey==="all") return chartDataStructure(iYear);

                if(iYear.toString()===sSelectedKey) chartDataStructure(iMonth);                
            });
            return oChartData;
        },
    })
});