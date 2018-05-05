<template>
  <div class="_container">
    <b-navbar toggleable="md" type="dark" variant="dark" v-bind:style="pageWidthStyle">
      <b-navbar-brand href="/">Slack Channels</b-navbar-brand>
    </b-navbar>
    
    <svg v-bind:width="pageWidth" height="960" font-family="sans-serif" font-size="10" text-anchor="middle"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as d3scale from "d3-scale";
import { mapGetters } from "vuex"

export default {
  name: "chart",
  computed: {
    pageWidth: function(){
      return this.channels.length * 120;
    },
    pageWidthStyle: function(){
      return {width: this.pageWidth + "px"};
    },
    channelData: function(){
      return this.channels.map(function(channel){
        return {
          id: channel.id,
          label: channel.name,
          memberCount: channel.members.length
        }
      })
    },
    ...mapGetters(["channels", "users"])
  },
  mounted: function(){
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      // console.table(this.sortedChannels());
      this.sortedChannels();

      const div = d3.select("body")
        .append("div") 
        .attr("class", "tooltip")
        .style("fill", "white");

      const g = d3.select('svg')
        .selectAll("g")
        .data(this.channelData)
        .enter()
        .append('g');

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // アニメーション
      g.append("circle")
        .transition()
        .delay(500)
        .duration(2000)
        .attr('cy', 140)
        .attr('cx', (d, i)=> (i+1) * 115)
        .attr('r', (d)=> d.memberCount * 4)
        .style("fill", function(d){return color(d.memberCount * Math.random(10) * 5);})
        
      // マウスカーソルが円に乗ったときのイベント
      g.on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div.html("# <strong>" + d.label + "</strong></br>" + "<strong>" + d.memberCount + "</strong> members.")
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("color", "white")
            .style("opacity", 1)
            .style("display","block");
        })
        .on("mouseout",function(){div.html(" ").style("display","none");});;

      // チャンネル名のラベル
      g.append("text")
        .attr('y', 260)
        .attr('x', (d, i)=> (i+1) * 115)
        .text((d)=> d.label)
        .style("fill", "white")
        .on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
            div.style("display","none");
            div.html("# <strong>" + d.label + "</strong></br>" + "<strong>" + d.memberCount + "</strong> members.")
              .style("left", (d3.event.pageX+12) + "px")
              .style("top", (d3.event.pageY-10) + "px")
              .style("color", "white")
              .style("opacity", 1)
              .style("display","block");
          })
        .on("mouseout",function(){div.html(" ").style("display","none");});
    })
  },
  methods: {
    sortedChannels: function(){
      return this.channels.sort(function(a, b){
        return b.members.length - a.members.length;
      })
    }
  }
}
</script>