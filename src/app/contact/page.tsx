import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">연락처</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-6 leading-relaxed">
          PickPlay를 이용해 주셔서 감사합니다. 버그 신고, 기능 제안, 광고 문의 등 어떤 내용이든 편하게 연락해 주세요. 모든 문의에 성심껏 답변드리겠습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">연락 방법</h2>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">이메일</h3>
          <p className="mb-2">
            <a
              href="mailto:gtech7859@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
            >
              gtech7859@gmail.com
            </a>
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            영업일 기준 1~3일 이내에 답변드립니다.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">GitHub</h3>
          <p className="mb-2">
            <a
              href="https://github.com/pick-play"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
            >
              github.com/pick-play
            </a>
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            버그 신고 및 기능 제안은 GitHub 이슈를 통해서도 가능합니다.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">문의 유형별 안내</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">버그 신고</h3>
        <p className="mb-3 leading-relaxed">
          도구가 제대로 작동하지 않거나 오류가 발생했나요? 빠른 해결을 위해 아래 정보를 함께 보내주시면 도움이 됩니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>오류가 발생한 도구 이름 및 URL</li>
          <li>사용 중인 브라우저 종류 및 버전 (예: Chrome 120, Safari 17)</li>
          <li>사용 중인 기기 종류 (예: PC, 스마트폰, 태블릿)</li>
          <li>오류 재현 방법 또는 스크린샷</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">기능 제안</h3>
        <p className="mb-3 leading-relaxed">
          새로운 도구나 기능에 대한 아이디어가 있으신가요? 사용자의 의견은 PickPlay를 발전시키는 데 큰 도움이 됩니다. 어떤 도구가 있으면 유용할지, 기존 도구에서 개선되었으면 하는 점은 무엇인지 자유롭게 제안해 주세요. 모든 제안을 검토하며, 채택된 아이디어는 서비스에 반영하겠습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">광고 문의</h3>
        <p className="mb-3 leading-relaxed">
          PickPlay는 Google AdSense를 통해 광고를 게재합니다. 광고 관련 문의(부적절한 광고 신고, 광고 협업 제안 등)가 있으신 경우 이메일로 연락해 주세요. 부적절한 광고를 발견하신 경우 광고 종류와 스크린샷을 함께 보내주시면 신속히 처리하겠습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">기타 문의</h3>
        <p className="mb-3 leading-relaxed">
          서비스 이용약관, 개인정보처리방침에 관한 질문이나 언론 문의, 협업 제안 등 기타 문의 사항도 이메일로 연락해 주세요. 제목에 문의 유형을 명시해 주시면 더 빠른 답변이 가능합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">자주 묻는 질문 (FAQ)</h2>

        <div className="space-y-6 mb-8">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h3 className="text-lg font-semibold mb-2">Q. PickPlay는 정말 무료인가요?</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              네, PickPlay의 모든 도구는 완전히 무료입니다. 회원가입도 필요 없습니다. 서비스 유지를 위해 Google AdSense 광고가 표시되지만, 광고를 클릭하지 않아도 모든 기능을 자유롭게 이용하실 수 있습니다.
            </p>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h3 className="text-lg font-semibold mb-2">Q. PDF나 이미지 파일이 서버에 저장되나요?</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              아니요, 업로드한 파일은 서버에 전송되거나 저장되지 않습니다. 모든 파일 처리는 사용자의 브라우저 내에서 이루어지며, 브라우저를 닫으면 파일 데이터는 완전히 삭제됩니다. 개인 정보나 민감한 파일도 안전하게 사용하실 수 있습니다.
            </p>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h3 className="text-lg font-semibold mb-2">Q. 금융 계산기 결과를 믿어도 되나요?</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              PickPlay의 금융 계산기(대출 이자, 연봉 실수령액, 퇴직금, 부동산 취득세 등)는 일반적인 계산 방식을 기반으로 한 참고용 도구입니다. 실제 금융 결정이나 세금 신고에는 반드시 공인 전문가 또는 해당 금융기관의 확인을 받으시기 바랍니다. 세법 및 금리는 수시로 변경될 수 있습니다.
            </p>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h3 className="text-lg font-semibold mb-2">Q. 모바일에서도 사용할 수 있나요?</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              네, PickPlay의 모든 도구는 모바일 환경에 최적화되어 있습니다. 스마트폰, 태블릿, PC 등 다양한 기기에서 별도의 앱 설치 없이 브라우저만으로 이용하실 수 있습니다.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="text-lg font-semibold mb-2">Q. 다국어를 지원하나요?</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              네, PickPlay는 한국어, 영어(English), 일본어(日本語), 중국어(中文), 스페인어(Español) 5개 언어를 지원합니다. 페이지 상단의 언어 선택 메뉴에서 원하는 언어로 변경하실 수 있습니다.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">응답 시간 안내</h2>
        <p className="mb-4 leading-relaxed">
          문의 사항은 영업일 기준 1~3일 이내에 답변드리는 것을 목표로 합니다. 문의량이 많은 시기에는 다소 시간이 걸릴 수 있습니다. 빠른 처리를 원하신다면 이메일 제목에 문의 유형([버그], [기능 제안], [광고 문의] 등)을 명시해 주세요.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            관련 페이지:{" "}
            <Link href="/about/" className="text-blue-600 dark:text-blue-400 hover:underline">소개</Link>
            {" "}·{" "}
            <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 hover:underline">개인정보처리방침</Link>
            {" "}·{" "}
            <Link href="/terms/" className="text-blue-600 dark:text-blue-400 hover:underline">이용약관</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
