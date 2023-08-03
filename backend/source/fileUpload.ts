import {OpenAI} from "langchain";
import {RetrievalQAChain} from "langchain/chains";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {MemoryVectorStore} from "langchain/vectorstores/memory";




export const process_doc = async (filename: string | undefined, question: string) => {
    const model = new OpenAI({});

    const loader = new PDFLoader(`/Users/ccaceres/Documentos/Universidad/APPMOVIL-2023/backend/uploads/${filename}`, {
        splitPages: false
    })


    const documento = await loader.load()
    const vectorStore = await MemoryVectorStore.fromDocuments(documento, new OpenAIEmbeddings())
    
    const vectorStoreRetriever = vectorStore.asRetriever()

    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);


    return await chain.call({
        query: question,
    })
}