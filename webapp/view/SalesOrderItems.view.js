sap.ui.define([
    "sap/f/GridContainerSettings"
], function(GridContainerSettings) {
    'use strict';
    return sap.ui.jsview("es5.view.SalesOrderItems",{
        getControllerName : function(){
            return "es5.controller.SalesOrderItems"
        },
        createContent : function(oController){
            const oTable  = new sap.m.Table({
                sticky : [sap.m.Sticky.ColumnHeaders],
                items : {
                    path : "ViewModel>/sales",
                    template : new sap.m.ColumnListItem({
                        cells : [
                            new sap.m.Text({text : "{ViewModel>SalesOrderID}"}),
                            // new sap.m.Text({text : "{ViewModel>NetAmount}"}),
                            // new sap.m.Text({text : "{ViewModel>TaxAmount}"}),
                            new sap.m.Text({text : "{ViewModel>GrossAmount}"}),
                            // new sap.m.Text({text : "{ViewModel>CurrencyCode}"}),
                            new sap.m.Text({text : "{ViewModel>Quantity}"}),
                            new sap.m.Text({
                                text : {
                                    path : 'ViewModel>DeliveryDate',
                                    formatter : function(dDate){
                                        return oController.Dateformat(dDate);
                                    }
                                }
                            })
                        ]
                    })
                },
                columns : [
                    new sap.m.Column({
                        header : new sap.m.Label({text : "SalesOrderID"})
                    }),
                    // new sap.m.Column({
                    //     hAlign : "End",
                    //     header : new sap.m.Label({text : "NetAmount"})
                    // }),
                    // new sap.m.Column({
                    //     hAlign : "End",
                    //     header : new sap.m.Label({text : "TaxAmount"})
                    // }),
                    new sap.m.Column({
                        hAlign : "End",
                        header : new sap.m.Label({text : "GrossAmount"})
                    }),
                    // new sap.m.Column({
                    //     hAlign : "Center",
                    //     header : new sap.m.Label({text : "Currency"})
                    // }),
                    new sap.m.Column({
                        width : "5rem",
                        hAlign : "End",
                        header : new sap.m.Label({text : "Quantity"})
                    }),
                    new sap.m.Column({
                        header : new sap.m.Label({text : "DeliveryDate"}),
                    })
                ],
            });
            
            const oTableCard = new sap.f.Card({
                header : new sap.f.cards.Header({
                    title : "SalesOrderItems ({= ${ViewModel>/sales}.length})"
                }),
                content : [
                    new sap.m.ScrollContainer({
                        vertical : true,
                        height : "20rem",
                        content : [oTable]
                    })
                ]
            });
            
            const oChartCard = new sap.f.Card({
                id : this.createId("chartCard"),
                header : new sap.f.cards.Header({
                    title : "{ViewModel>/salesOrderChart/title}",
                    toolbar : new sap.m.OverflowToolbar({
                        content : [
                            new sap.m.ComboBox({
                                selectedKey : "{ViewModel>/salesOrderChart/selectedKey}",
                                change : ()=>oController.onChartDataChange(),
                                items : {
                                    path : "ViewModel>/salesOrderChart/year",
                                    template : new sap.ui.core.ListItem({
                                        key : "{ViewModel>key}",
                                        text : "{ViewModel>text}"
                                    })
                                }
                            }),
                        ]
                    })
                }),
                content : [
                    new es5.control.ChartJS({
                        type : "line",
                        labels : "{ViewModel>/salesOrderChart/data/labels}",
                        datasets : "{ViewModel>/salesOrderChart/data/datasets}",
                        options : "{ViewModel>/salesOrderChart/options}"
                    })
                ]
            });
            
            const oGridContainer = new sap.f.GridContainer({
                layout : new GridContainerSettings({
                    rowSize : "30rem",
                    columnSize : "35rem",
                    gap : "2rem"
                }),
                items :[
                    oTableCard,
                    oChartCard
                ]
            });

            const oPage = new sap.m.Page(this.createId("page"),{
                showNavButton : true,
                title : "{ViewModel>/productId}",
                navButtonPress : function(){
                    oController.onNavBack();
                },
                content : [
                    oGridContainer.addStyleClass("sapUiSmallMargin")
                ]
            });
    
            return oPage
        }
    })
});
