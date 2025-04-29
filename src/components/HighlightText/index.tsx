const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'gi'); // Note the capturing parentheses
    const parts = text.split(regex);

    return parts.map((part, index) => {
        if (part.toLowerCase() === search.toLowerCase()) {
            return (
                <span key={index} style={{ color: 'green', fontWeight: 'bold' }}>
                    {part}
                </span>
            );
        }
        return part;
    });
};

type HighlightedTextProps = {
    text: string;
    searchTerm: string;
};

const HighlightedText = ({ text, searchTerm }: HighlightedTextProps) => (
    <>{highlightText(text, searchTerm)}</>
);

export default HighlightedText;
