export default function (string: string | undefined) {
    return string ? new Date(string).toLocaleDateString() : ""
}