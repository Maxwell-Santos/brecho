## Tutorial de upload de imagens no express e mongodb (mas vou tentar usar na route api do nextjs)

- dependências: 
  - dotenv - salvar informações sensíveis no banco de dados
  - mongoose - manipular o banco
  - multer - módulo que vai fazer o upload do arquivo
  - path - pegar o nome da extensão do arquivo

  ### Criar um schema para a img
  ```tsx
  const PictureSchema = new Schema({
    name: {type: string, required: true},
    src: {type: string, required: true}
  })

  export default mongoose.model("Picture", PictureSchema)
  ```

  ### Controller
  - chamar o model

  métodos: criar, excluir, mostrar todas as img

  -> config
    -> multer.js
```tsx
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "uploads/") //vai salvar o arquivo nessa pasta
  }, 
  filename: function(req, file, callback){
    callback(null, Date.now() + path.extname(file.originalname)) //o nome do arquivo vai ser uma data, para ele nunca repetir os nomes
  }
})

const upload = multer({storage})

export upload
```

Importar esse upload na rota onde faz a criação do dado
(a ideia é essa img ficar disponível no *param req* da api route)

```tsx
export default async function handler(req, res){
  try{
    const {name} = req.body
    const file = req.file

    // nova instância do model
    const picture = new Picture({
      name,
      src: file.path
    })

    await picture.save()

    res.status(200).json({message: "Imagem Salva"})
  } catch(error){
    res.status(500).json({message: "Erro ao salvar a imagem"})
  }
}
```
### Rota de remover arquivo

```tsx
import fs from 'fs'

export default async function handler(req, res) {
  try{
    const picture = await Picture.findById(req.params.id)

    if(!picture){
      return res.status(404).json({message: "Imagem não encontrada"})
    }

    fs.unlinkSync(picture.src) //remove o arquivo
    await picture.remove() //remove registro

    res.status(200).json({message: "Imagem removida"})

  } catch(error) {
    res.status(500).json({message: "Erro ao excluir a img"})
  }
}
```