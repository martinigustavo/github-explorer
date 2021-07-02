// type (string): Can be one of all, owner, member. Default: owner
// sort (string): Can be one of created, updated, pushed, full_name. Default: full_name
// direction (string): Can be one of asc or desc. Default: asc when using full_name, otherwise desc
// page (integer): Current page
// per_page (integer): number of records per page

interface Profile {}

export default function useProfile(user: string) {
    return {};
}
