import { useTranslation } from "react-i18next";

export default function Handle({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex px-8 justify-between items-center">
        <span className="w-4 h-8 bg-slate-900"></span>
        <span className="self-start flex-1 h-4 bg-slate-900"></span>
        <span className="w-4 h-8 bg-slate-900"></span>
      </div>
      <div className="flex px-8 justify-between items-center">
        <span className="w-4 h-16 bg-slate-400"></span>
        <h2 className="text-2xl font-medium">
          {title === "Organize"
            ? t("listTitle.organize")
            : t("listTitle.ready")}
        </h2>
        <span className="w-4 h-16 bg-slate-400"></span>
      </div>
    </>
  );
}
