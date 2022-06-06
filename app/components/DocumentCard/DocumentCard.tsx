import type { DocumentType, DocumentTypeEnum } from "~/models/type";

type DocumentCardType = {
    document: DocumentType
}

const showType = (type: DocumentTypeEnum): string => {
    return type.charAt(0) + type.slice(1).toLowerCase();
}

const DocumentCard = ({ document }: DocumentCardType) => {
    return <div className="document-card">
        <div className="header">
            {document.title}
        </div>
        <div className="body">
            <div className="type">{showType(document.type)}</div>
            <div className="type">{document.date}</div>
        </div>
    </div>
}

export default DocumentCard