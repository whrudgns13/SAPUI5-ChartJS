sap.ui.define([
	"sap/ui/core/Control",
	"../lib/Chart",
], function (Control) {
	"use strict";
	return Control.extend("es5.control.ChartJS", {
		metadata : {
			library : "es5.control",
			properties : {
				type :{type : "string", defaultValue : null},
				labels : {type : "object", multiple : true, defaultValue : null},
				datasets : {type : "object", multiple : true, defaultValue : undefined},
				height : {type : "string", defaultValue : undefined},
				width : {type : "string", defaultValue : undefined},
				options : {type : "object", multiple : true, defaultValue : undefined}
			}
		},
		init : function () {},
		setType : function(sType){
			this.setProperty("type",sType,true);
			if ( this.__chart ) {
				this.__chart.type = sType;
			}
			this.updateChart();
		},
		setLabels : function(aLabel){
			this.setProperty("labels",aLabel,true);
			if ( this.__chart ) {
				this.__chart.data.labels = aLabel;
			}			
			this.updateChart();
		},
		setDatasets : function(aDataset){
			this.setProperty("datasets",aDataset,true);
			if ( this.__chart ) {
				this.__chart.data.datasets = aDataset;
			}
			this.updateChart();
		},
		setOptions : function(oOptions){
			this.setProperty("options",oOptions,true);
			if ( this.__chart ) {
				this.__chart.options = oOptions;
			}
			this.updateChart();
		},
		updateChart: function(iDuration, bLazy) {
			if( this.__chart ) {
				this.__chart.update(iDuration, bLazy);
			}
		},
		renderer : function (oRM, oControl) {
			oRM.write("<canvas");			//태그시작
			oRM.writeControlData(oControl);	//id 추가
			oRM.addClass("chart__padding");	//class추가
			// this.addOuterClasses(oRM, oControl);
			oRM.writeClasses();				//class 끝
			oRM.write(">");					//태그닫기
			
			//스타일 추가
			if (oControl.getHeight()) oRM.addStyle("height", oControl.getHeight());			
			if (oControl.getWidth()) oRM.addStyle("width", oControl.getWidth());
			
			oRM.writeStyles();	//스타일 닫기
			
			oRM.write("</canvas>");	//태그 종료
		},
		onAfterRendering : function(){
			this.__chart = new Chart(document.querySelector(`#${this.getId()}`),{
				type : this.getType(),
				data : {
					labels : this.getLabels(),
					datasets : this.getDatasets(),
				},
				options : this.getOptions()
			});
		}
	});
});