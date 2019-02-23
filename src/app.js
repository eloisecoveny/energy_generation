import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			generationMix: [],
			fromDateTime: "",
			toDateTime: "",
			chartData: [],
			chartOptions: {
				width: 800,
				height: 240,
				title: 'Generation Mix for the GB power system',
				colors: ['#084887', '#f58a07', '#f9ab55', '#f7f5fb', '#909cc2', '#C1BB8F', '#A176BC']
			}
		},
		methods: {
			getData: function(){
				fetch("https://api.carbonintensity.org.uk/generation")
					.then(response => response.json())
					.then(data => {
						this.fromDateTime = new Date(data.data.from);
						this.toDateTime = new Date(data.data.to);
						this.generationMix = data.data.generationmix
					})
					.then(() => {
						this.generateChartData();
					});
			},
			generateChartData(){
				const data = [];
				data.push(Object.keys(this.generationMix[0]));
				for(let valueSet of this.generationMix){
					data.push(Object.values(valueSet))
				};
				this.chartData = data;
			}
		},
		mounted: function() {
			this.getData();
		}
	});
});
