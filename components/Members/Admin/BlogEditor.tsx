import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { getStorage,ref,uploadBytes, getDownloadURL } from "firebase/storage";
// import CheckList from "@editorjs/checklist";
 import Code from "@editorjs/code";
// import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
// import InlineCode from "@editorjs/inline-code";
 import List from "@editorjs/list";
//import Quote from "@editorjs/quote";
// import Table from "@editorjs/table";
// import SimpleImage from "@editorjs/simple-image";
// import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
// import Raw from "@editorjs/raw";
const storage = getStorage();
const storageref = ref(storage, 'blogimages');
const EDITOR_TOOLS = {
    embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
    },
    image: {
        class: Image,
        config:{
            uploader: {
                uploadByFile: (file) => {
                  return new Promise((resolve) => {
                    uploadBytes(storageref, file).then((snapshot) => {
                      console.log(snapshot);
                      getDownloadURL(snapshot.ref).then((url) => {
                        resolve({ success: 1, file: { url: url } });
                        console.log(url);
                      })
                      
                      // console.log(snapshot);
                      // resolve({
                      //   success: 1,
                      //   file: {
                      //     url: url
                      //   }
                      // });
                    });
                    console.log(file);
                  });
                }
            }
        }
    },      
  header: {
    class: Header,
    shortcut: "CMD+H",
    inlineToolbar: true,
    config: {
      placeholder: "Enter a Header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
//   paragraph: {
//     class: Paragraph,
//     inlineToolbar: true,
//   },
//   checklist: CheckList,
//   inlineCode: InlineCode,
//   table: Table,
//   list: List,
//   quote: Quote,
//   delimiter: Delimiter,
//   raw: Raw,
};

function Editor({ data, onChange, holder }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writing here...",
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
          onChange(content);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      id={holder}
      className="width-full border border-2 m-2 p-2 h-1/6 rounded-md bg-gray-100" 
    
    />
  );
}

export default Editor;
