module.exports = function(tasks) {
  return tasks.filter(task => {
    if (task === false || task === null || task === undefined) {
      return false;
    } else {
      return true;
    }
  });
};
