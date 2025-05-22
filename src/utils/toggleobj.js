
export function gettoggleobj(data) {
    // console.log(data);

    return data?.reduce((acc, obj) => {
        let keys = ["id", "name"];

        Object.keys(obj).forEach((key) => {
            // console.log(key);

            if (!keys.includes(key)) {
                if (!acc[key]) {
                    acc[key] = [];
                }

                let value = String(obj[key]).toLowerCase();
                if (value && !acc[key].includes(value)) {
                    acc[key].push(value);
                }
            }
        });
        // console.log(acc);

        return acc;
    }, {});
}