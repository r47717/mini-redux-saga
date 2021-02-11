export async function getData(id) {
  console.log(`retrieving data for id=${id}`);

  return new Promise((resolve) => {
    setTimeout(resolve, 1000, 123);
  });
}
