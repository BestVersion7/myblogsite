function DangerousHTML({ post }) {
    return <div dangerouslySetInnerHTML={{ __html: `<div>${post}</div>` }} />;
}

export default DangerousHTML;
