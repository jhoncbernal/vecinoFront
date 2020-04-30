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
    state: "Procesando",
  });
  states.set("prepare", {
    icon: listCircleSharp,
    color: "purple",
    state: "Alistado",
  });
  states.set("delivery", {
    icon: "assets/icons/deliveryTimeOutline.svg",
    color: "blue-hole",
    state: "Despachado",
  });
  states.set("finished", {
    icon: checkmarkCircleSharp,
    color: "green-light",
    state: "Recibido",
  });
  states.set("cancel", {
    icon: closeCircleSharp,
    color: "red-light",
    state: "Cancelado",
  });
  return {
    states
}}