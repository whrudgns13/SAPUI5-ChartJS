sap.ui.define([
	"sap/ui/core/Control",
	"../lib/Chart",
], function (Control) {
	"use strict";
	return Control.extend("es5.control.ChartJS", {
		metadata : {
			properties : {
				type :{type : "string", group : "Appearance", defaultValue : null},
				labels : {type : "string[]", group : "Appearance", defaultValue : null},
				datasets : {type : "object[]",  group : "Appearance", defaultValue : undefined},
				height : {type : "string",  group : "Appearance", defaultValue : undefined},
				width : {type : "string", group : "Appearance", defaultValue : undefined},
				options : {type : "object", group : "Appearance", defaultValue : undefined}
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
				this.__chart.data.options = oOptions;
			}
			this.updateChart();
		},
		updateChart: function(iDuration, bLazy) {
			if( this.__chart ) {
				this.__chart.update(iDuration, bLazy);
			}
		},
		renderer : function (oRM, oControl) {
			oRM.write("<canvas");
			oRM.writeControlData(oControl);
			oRM.addClass("chart__padding");
			// this.addOuterClasses(oRM, oControl);
			oRM.writeClasses();
			oRM.write(">");
			
			if (oControl.getHeight() !== undefined && oControl.getHeight() !== null) {
				oRM.addStyle("height", oControl.getHeight());
			}
			if (oControl.getWidth() !== undefined && oControl.getWidth() !== null) {
				oRM.addStyle("width", oControl.getWidth());
			}
			oRM.writeStyles();
			
			oRM.write("</canvas>");
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
		},
		onBeforeRendering : function(){
			
		}
	});
});