const shortenDescription = (type, length, str) => {
  if(type === "word") return str.split(" ").slice(0, length).join(" ") + "..."
  return str.split("").slice(0, length).join("") + "..."
}

export {shortenDescription}