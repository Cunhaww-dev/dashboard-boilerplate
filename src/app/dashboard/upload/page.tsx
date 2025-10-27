"use client";
import {
  ImageDropzone,
  UploadableFile,
} from "@/components/dashboard/upload/image-dropzone";
import PageTitle from "@/components/shared/typography/page-title";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * SERVIÇO DE UPLOAD SIMULADO (MOCK)
 * * Esta função finge ser sua API. Ela recebe o arquivo e, após um tempo,
 * retorna os dados OCR (no caso, um link de Excel mockado).
 */
async function mockUploadService(file: File): Promise<{ downloadUrl: string }> {
  console.log("Iniciando upload simulado para:", file.name);

  // Simula o tempo de rede (ex: 2 segundos)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simula a resposta do backend (o OCR)
  const mockExcelUrl = "/mock/ocr-result.xlsx"; // Um link falso
  console.log("Upload concluído. OCR gerado:", mockExcelUrl);

  return { downloadUrl: mockExcelUrl };
}

export default function Upload() {
  // O estado agora vive na página, não no componente dropzone
  const [file, setFile] = useState<UploadableFile | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) {
      setError("Por favor, selecione uma imagem primeiro.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadResult(null);

    try {
      const result = await mockUploadService(file.file);

      setUploadResult(result.downloadUrl);
      setFile(null); // Limpa o dropzone após o sucesso
    } catch (err) {
      console.error(err);
      setError("Houve um erro no upload. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setUploadResult(null);
    setError(null);
  };

  return (
    <div>
      <PageTitle title="Upload" subtitle="Faça aqui o upload das imagens" />
      {/* O Componente Controlado */}
      <ImageDropzone
        value={file}
        onChange={(newFile) => {
          setFile(newFile); // Atualiza o estado da página
          if (newFile) {
            // Limpa erros/resultados antigos se um novo arquivo for selecionado
            setError(null);
            setUploadResult(null);
          }
        }}
      />

      {/* Seletor de Estado (Botão, Loading, Resultado) */}
      <div className="mt-6">
        {uploadResult ? (
          // 3. Estado de Sucesso
          <div className="p-4 bg-green-100 border border-green-300 rounded-md">
            <h4 className="font-semibold text-green-800">
              Processamento Concluído!
            </h4>
            <p className="text-green-700">Seu arquivo Excel está pronto.</p>
            <a
              href={uploadResult}
              download
              className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Baixar Excel
            </a>
          </div>
        ) : (
          // 1. Estado Padrão (Botão de Envio)
          <>
            <div className="flex items-center gap-4">
              <Button
                variant="default"
                onClick={handleSubmit}
                disabled={!file || isUploading}
                size="lg"
              >
                {isUploading
                  ? "Processando Imagem..."
                  : "Iniciar Processamento OCR"}
              </Button>

              {file && !isUploading && (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleRemoveImage}
                >
                  Remover Imagem
                </Button>
              )}
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
