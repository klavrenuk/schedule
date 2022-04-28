const createListTasks = (sections, tasks, type) => {
    let arr = [];

    sections.forEach((section) => {
        const itemSection = {
            ...section._doc,
            tasks: tasks.filter((task) => {
                if(section._id.toString() === task.sectionId.toString()) {
                    return task;
                }
            })
        }

        if(type === 'completed') {
            if(itemSection.tasks && itemSection.tasks.length > 0) {
                arr.push(itemSection);
            }

        } else {
            arr.push(itemSection);
        }
    });

    return arr;
}

module.exports = {createListTasks};