import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventPosterUrl: {
    type: String,
    required: true,
  },
  participants:{
    type:Array,
    default:[]
  },
  completed:{
    type:Boolean,
    default:false
  },
  winner:{
    type:String,
    default:""
  },
  startdate:{
    type:String,
    required:true
  },
  deadline:{
    type:String,
    required:true
  }

});

const Event = mongoose.model('Event', eventSchema);

export default Event;
