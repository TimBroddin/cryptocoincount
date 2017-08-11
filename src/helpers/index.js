const absoluteUrl = (asset) => {
  if(typeof window !== 'undefined') {
    return `${asset}`
  } else {
    return `/static/${asset}`;
  }
}

export {absoluteUrl};
