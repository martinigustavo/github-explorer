import { useState } from "react";

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export default function useRepositories(user: string, pageLimit?: number) {
    const [repositories, setRepositories] = useState<Repository[]>([]);

    function fetchRepositories(page: number) {
        const virtualPage = page - 1 <= 0 ? 0 : page - 1;

        const xhr = new XMLHttpRequest();
        var data;

        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            if (xhr.status === 403) {
                throw Error("API rate limit exceeded.");
            }

            if (xhr.readyState === 4) {
                console.log(xhr.response);
                data = xhr.response;

                setRepositories(data);
            }
        };

        xhr.open(
            "GET",
            `https://api.github.com/users/${user}/repos?page=${virtualPage}&per_page=${
                pageLimit || 1000
            }`
        );

        xhr.send();
        // fetch(
        //     `https://api.github.com/users/${user}/repos?page=${virtualPage}&per_page=${
        //         pageLimit || 1000
        //     }`
        // )
        //     .then((res) => {
        //         if (res.status === 403) {
        //             throw Error("API rate limit exceeded.");
        //         }
        //         res.json();
        //     })
        //     .then((data) => setRepositories)
        //     .catch(window.alert);
    }

    return {
        fetchRepositories,
        repositories,
    };
}
