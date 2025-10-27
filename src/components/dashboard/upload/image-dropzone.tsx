"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import Image from "next/image";
import { UploadCloud, CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

// Interfaces (sem mudanças)
export interface UploadableFile {
  file: File;
  preview: string;
  errors: any[];
}

interface ImageDropzoneProps {
  value: UploadableFile | null;
  onChange: (file: UploadableFile | null) => void;
  className?: string;
  disabled?: boolean;
}

export function ImageDropzone({
  value,
  onChange,
  className,
  disabled = false,
}: ImageDropzoneProps) {
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setRejectionMessage(null);

      if (disabled) return;

      if (fileRejections.length > 0) {
        setRejectionMessage(fileRejections[0].errors[0].message);
        onChange(null);
        return;
      }

      if (acceptedFiles.length > 0) {
        const acceptedFile = acceptedFiles[0];
        const fileWithPreview: UploadableFile = {
          file: acceptedFile,
          preview: URL.createObjectURL(acceptedFile),
          errors: [],
        };
        onChange(fileWithPreview);
      }
    },
    [onChange, disabled]
  );

  // Configurações (sem mudanças)
  const acceptConfig: Accept = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptConfig,
      maxFiles: 1,
      multiple: false,
      disabled, // Passa o estado de desabilitado para o hook
    });

  // Limpeza do Blob (sem mudanças)
  useEffect(() => {
    return () => {
      if (value) {
        URL.revokeObjectURL(value.preview);
      }
    };
  }, [value]);

  return (
    <div className={cn("w-full grid gap-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-48",
          "border-2 border-dashed rounded-lg",
          "cursor-pointer transition-colors",

          // Cores base (idle) - vai se adaptar ao dark mode
          "border-border bg-background text-muted-foreground",
          "hover:border-primary/60 hover:text-primary/80",
          {
            "border-primary bg-primary/10 text-primary":
              isDragActive && !isDragReject,
          },
          {
            "border-destructive bg-destructive/10 text-destructive":
              isDragReject,
          },
          {
            "border-primary bg-primary/10 text-primary": value && !isDragReject,
          },
          { "opacity-50 cursor-not-allowed": disabled }
        )}
      >
        <input {...getInputProps()} />

        {/* Renderização condicional do conteúdo interno 
          para uma UI mais rica
        */}
        {value && !isDragReject ? (
          // Estado de Sucesso (Arquivo selecionado)
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12" />
            <p className="font-semibold mt-2">Imagem Selecionada</p>
            <p className="text-xs text-muted-foreground">{value.file.name}</p>
          </div>
        ) : isDragReject ? (
          // Estado de Rejeição
          <div className="flex flex-col items-center text-center">
            <XCircle className="w-12 h-12" />
            <p className="font-semibold mt-2">Arquivo não suportado</p>
            <p className="text-xs text-muted-foreground">
              {rejectionMessage || "Tente um .jpg, .png ou .webp"}
            </p>
          </div>
        ) : isDragActive ? (
          // Estado Arrastando
          <div className="flex flex-col items-center text-center">
            <UploadCloud className="w-12 h-12 animate-pulse" />
            <p className="font-semibold mt-2">Solte a imagem aqui...</p>
          </div>
        ) : (
          // Estado Padrão (Idle)
          <div className="flex flex-col items-center text-center">
            <UploadCloud className="w-12 h-12" />
            <p className="font-semibold mt-2">
              Arraste e solte ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              Apenas 1 imagem (.jpg, .png, .webp)
            </p>
          </div>
        )}
      </div>

      {/* Preview (também estilizado) */}
      {value && value.preview && (
        <div className="mt-0">
          <h4 className="font-semibold text-foreground mb-2">Preview:</h4>
          <div className="relative w-full max-w-xs h-auto border rounded-md overflow-hidden">
            <Image
              src={value.preview}
              alt="Preview do upload"
              width={300}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Botão de Remover usando o componente <Button> do shadcn */}
          {/* <Button
            variant="destructive"
            className="mt-4"
            size="sm"
            onClick={() => onChange(null)}
            disabled={disabled}
          >
            Remover imagem
          </Button> */}
        </div>
      )}
    </div>
  );
}
