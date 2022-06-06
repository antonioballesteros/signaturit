import type { DocumentType, DocumentTypeEnum } from "~/models/type";
import { showType, showDate } from '~/utils'

type DocumentCardType = {
    document: DocumentType
}



const DocumentCard = ({ document }: DocumentCardType) => {
    return <div className="document-card">
        {!!document.image &&
            <div className="img">
                <img src={document.image} alt={document.title} />
            </div>
        }
        <div className="card">
            <div className="header">
                {document.title}
            </div>
            <div className="body">
                <div className="type">{showType(document.type as DocumentTypeEnum)}</div>
                <div className="type">{showDate(document.createdAt)}</div>
            </div>
        </div>
    </div>
}

export default DocumentCard