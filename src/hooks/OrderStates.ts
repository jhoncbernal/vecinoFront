import {
    checkmarkCircleSharp,
    closeCircleSharp,
    cubeSharp,
    listCircleSharp,
  } from "ionicons/icons";


  export  const StatesDictionary=()=>{
  const states = new Map<string, { icon: any; color: string; state: string }>();
  states.set("start", {
    icon: cubeSharp,
    color: "gray",
    state: "Processing",
  });
  states.set("prepare", {
    icon: listCircleSharp,
    color: "purple",
    state: "Preparing",
  });
  states.set("delivery", {
    icon: "assets/icons/deliveryTimeOutline.svg",
    color: "blue-hole",
    state: "Dispatched",
  });
  states.set("finished", {
    icon: checkmarkCircleSharp,
    color: "green-light",
    state: "In delivery",
  });
  states.set("cancel", {
    icon: closeCircleSharp,
    color: "red-light",
    state: "Paid",
  });
  return {
    states
}}