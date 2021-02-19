import React from "react";
import getBC from '../mapview/helper';

export class Canvas extends React.Component {
  loadFile(district){
    _SB.storedFetch("./get_district_polygon?"+new URLSearchParams({
      district: this.props.file.Districts[district],
    }))
    .then(res => this.setState({file: res}));
  }

  constructor(props){
    super(props);
    this.state = {map: null,oldPolyR: []}
    this.loadFile(0);
  }
  
  componentDidMount(){
    const mapH = this.refs.mapholder;
    var map = L.map(mapH);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
        
    this.setState({map});
  }
  
  click(e){
    let res = this.move(e);
    this.props.setClipboard(res);
  }
  
  move(e){
    this.props.setLatitude(e.latlng.lat);
    this.props.setLongitude(e.latlng.lng);
    let o = '';
    let c = getBC(
      e.latlng.lat,
      e.latlng.lng,
      this.props.depth, 
      this.props.file,
      [this.props.method]
    );
    if (c.success){
      o = c.message[this.props.file.methods[this.props.method]];
    }
    console.log(c);
    this.props.setBC(o);
    return o;
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.district !== this.props.district) {
      this.loadFile(this.props.district);
    }
    if(!this.state.file)
      return;// Wait for district list to load
    for(let i in this.state.oldPolyR)
      this.state.oldPolyR[i].remove();
    this.state.oldPolyR=[];
        
    let polygon = L.geoJSON(this.state.file).addTo(this.state.map);
    let bounds = polygon.getBounds();
    this.state.map.fitBounds(bounds);
    polygon.on('click',this.click.bind(this));
    polygon.on('mousemove',this.move.bind(this));
    this.state.map.setMaxBounds(bounds);
    this.state.oldPolyR.push(polygon);  

    if(this.props.showLocation){
      let results=this.props.file.results;
      for (let i in results){
          let marker = L.marker([results[i].lat, results[i].long]).addTo(this.state.map);
		      //marker.bindPopup(dis.points.l[i]);
          this.state.oldPolyR.push(marker);
        }
      }
  };
  
  render(props){
    return(
      <div style={{width:'100%',height:'100%',position:'absolute'}} ref="mapholder">
      </div>
    );
  }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    district: state.state.district,
    showLocation: state.state.showLocation,
    method: state.state.method,
    depth: state.state.depth
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setClipboard: (d) => dispatch(actionCreater.setState('clipboard',d)),
  setLatitude: (d) => dispatch(actionCreater.setState('latitude',d)),
  setLongitude: (d) => dispatch(actionCreater.setState('longitude',d)),
  setBC: (d) => dispatch(actionCreater.setState('BC',d)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
