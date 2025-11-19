let resourceLimit = {
  mode: "normal",

  cpuLimit: 50,  // CPU max % allowed
  ramLimitMB: 500, // RAM max allowed
};

export function getResourceLimit() {
  return resourceLimit;
}

export function applyAction(action) {
  if (action === "scale_up_limit") {
    resourceLimit = {
      mode: "scale_up_limit",
      cpuLimit: 85,
      ramLimitMB: 1200,
    };
  } 
  
  else if (action === "scale_down_limit") {
    resourceLimit = {
      mode: "scale_down_limit",
      cpuLimit: 30,
      ramLimitMB: 350,
    };
  } 
  
  else {
    resourceLimit = {
      mode: "normal",
      cpuLimit: 50,
      ramLimitMB: 500,
    };
  }
}
