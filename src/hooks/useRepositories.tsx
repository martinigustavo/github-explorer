import { useState } from "react";

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export default function useRepositories(user: string, pageLimit: number) {
    const [repositories, setRepositories] = useState<Repository[]>([]);

    function fetchRepositories(page: number) {
        const virtualPage = page - 1 <= 0 ? 0 : page - 1;

        fetch(
            `https://api.github.com/users/${user}/repos?page=${virtualPage}&per_page=${pageLimit}`
        )
            .then((res) => {
                if (res.status === 403) {
                    throw Error("API rate limit exceeded.");
                } else {
                    res.json();
                }
            })
            .then((data) => setRepositories)
            .catch(window.alert);
    }

    return {
        fetchRepositories,
        repositories,
    };
}
