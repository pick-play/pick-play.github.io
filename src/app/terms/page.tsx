import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">이용약관</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          시행일: 2024년 1월 1일 &nbsp;|&nbsp; 최종 수정일: 2024년 1월 1일
        </p>

        <p className="mb-6 leading-relaxed">
          본 이용약관(이하 &quot;약관&quot;)은 PickPlay(이하 &quot;서비스&quot; 또는 &quot;당사&quot;)가 운영하는 웹사이트 및 제공하는 모든 서비스의 이용에 관한 조건을 규정합니다. 서비스를 이용함으로써 본 약관에 동의하시는 것으로 간주됩니다. 약관에 동의하지 않으시는 경우 서비스를 이용하지 마세요.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. 서비스 설명</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 파티 게임, 생활 도구, 금융 계산기, 아케이드 게임, 심리 테스트 등 42가지 이상의 무료 온라인 도구를 제공하는 웹 서비스입니다. 서비스는 한국어, 영어, 일본어, 중국어, 스페인어 5개 언어로 제공됩니다. PickPlay는 회원가입 없이 누구나 무료로 이용할 수 있으며, 별도의 앱 설치도 필요하지 않습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. 이용 조건</h2>
        <p className="mb-4 leading-relaxed">서비스를 이용하려면 다음 조건을 준수해야 합니다.</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>무료 이용:</strong> PickPlay의 모든 도구는 무료로 제공됩니다. 기본 서비스 이용에 대해 어떠한 요금도 청구하지 않습니다.</li>
          <li><strong>비회원 서비스:</strong> 서비스는 회원가입 없이 이용할 수 있습니다. 단, 일부 기능은 브라우저의 로컬 스토리지를 사용할 수 있습니다.</li>
          <li><strong>적법한 사용:</strong> 서비스를 법적으로 허용된 목적으로만 이용해야 합니다. 불법적이거나 타인에게 해를 끼치는 방식으로 서비스를 사용해서는 안 됩니다.</li>
          <li><strong>상업적 사용 제한:</strong> 서비스의 콘텐츠, 소스 코드, 디자인을 당사의 명시적인 서면 동의 없이 상업적 목적으로 사용하는 것은 금지됩니다.</li>
          <li><strong>자동화 도구 제한:</strong> 봇, 크롤러, 스크레이퍼 등 자동화 도구를 사용하여 서비스에 과도한 부하를 주는 행위는 금지됩니다.</li>
          <li><strong>서비스 방해 금지:</strong> 서비스의 정상적인 운영을 방해하거나, 서버에 비정상적인 트래픽을 발생시키는 행위는 금지됩니다.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. 면책 조항</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay가 제공하는 모든 도구와 콘텐츠는 &quot;있는 그대로(as-is)&quot; 제공되며, 다음 사항에 대해 어떠한 보증도 하지 않습니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>금융 계산기 결과:</strong> 대출 이자 계산기, 연봉 실수령액 계산기, 퇴직금 계산기, 부동산 취득세 계산기 등 금융 도구의 계산 결과는 참고용으로만 사용하세요. 실제 금융 결정에 앞서 반드시 공인 금융 전문가 또는 해당 기관에 확인하시기 바랍니다. 계산 결과에는 법적 효력이 없습니다.</li>
          <li><strong>심리 테스트 결과:</strong> MBTI, 커플 궁합, 테토-에겐 등 심리 테스트는 오락 목적으로 제작되었습니다. 과학적으로 검증된 결과가 아니며, 중요한 결정의 근거로 사용해서는 안 됩니다.</li>
          <li><strong>서비스 정확성:</strong> 최대한 정확한 정보를 제공하기 위해 노력하지만, 서비스의 모든 내용이 완전하고 정확함을 보장하지 않습니다.</li>
          <li><strong>서비스 가용성:</strong> 서비스의 중단 없는 이용을 보장하지 않습니다. 유지보수, 업데이트, 또는 예상치 못한 오류로 인해 서비스가 일시적으로 중단될 수 있습니다.</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          PickPlay는 서비스 이용으로 인해 발생하는 직접적, 간접적, 우발적, 특별적 손해에 대해 법적으로 허용되는 최대 범위 내에서 책임을 지지 않습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. 지적재산권</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay 웹사이트의 디자인, 로고, 텍스트, 이미지, 소스 코드 등 모든 콘텐츠는 PickPlay 또는 관련 라이선스 제공자의 지적재산입니다. 다음 행위는 명시적인 서면 허가 없이 금지됩니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>서비스 콘텐츠의 무단 복제, 배포, 수정, 게시</li>
          <li>서비스의 소스 코드를 상업적 목적으로 사용</li>
          <li>PickPlay 로고 또는 상표를 무단으로 사용</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          단, PickPlay는 오픈소스 프로젝트이며, 오픈소스 라이선스 조건 내에서 소스 코드를 자유롭게 사용할 수 있습니다. 자세한 내용은 <a href="https://github.com/pick-play" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub 저장소</a>를 확인해 주세요.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. 서비스 변경 및 중단</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 사전 통지 없이 서비스의 일부 또는 전부를 변경, 일시 중단, 또는 종료할 권리를 보유합니다. 서비스 변경이나 중단으로 인해 발생하는 손해에 대해 PickPlay는 책임을 지지 않습니다. 중요한 변경 사항은 웹사이트를 통해 공지하기 위해 노력합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. 제3자 링크 및 광고</h2>
        <p className="mb-4 leading-relaxed">
          서비스에는 제3자 웹사이트로 연결되는 링크 및 Google AdSense를 통한 광고가 포함될 수 있습니다. 이러한 제3자 콘텐츠는 PickPlay의 통제 범위 밖에 있으며, 제3자 사이트의 콘텐츠, 개인정보 보호정책, 관행에 대해 PickPlay는 책임을 지지 않습니다. 제3자 사이트를 방문할 때는 해당 사이트의 이용약관 및 개인정보처리방침을 확인하시기 바랍니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. 개인정보 보호</h2>
        <p className="mb-4 leading-relaxed">
          서비스 이용 중 수집되는 정보의 처리에 관한 자세한 내용은{" "}
          <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 hover:underline">
            개인정보처리방침
          </Link>
          을 참고하세요.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. 준거법 및 관할</h2>
        <p className="mb-4 leading-relaxed">
          본 약관은 대한민국 법률에 따라 해석되고 적용됩니다. 본 약관과 관련된 분쟁은 대한민국 법원을 전속 관할 법원으로 합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. 약관 변경</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 필요한 경우 본 약관을 변경할 수 있습니다. 변경된 약관은 웹사이트에 게시된 날부터 효력이 발생합니다. 변경 후 서비스를 계속 이용하시면 변경된 약관에 동의하는 것으로 간주됩니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. 연락처</h2>
        <p className="mb-4 leading-relaxed">
          본 약관에 관한 질문이나 이의가 있으신 경우 아래로 연락해 주세요.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>이메일: <a href="mailto:pickplay.tools@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">pickplay.tools@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/pick-play" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/pick-play</a></li>
          <li>연락처 페이지: <Link href="/contact/" className="text-blue-600 dark:text-blue-400 hover:underline">문의하기</Link></li>
        </ul>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            관련 페이지:{" "}
            <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 hover:underline">개인정보처리방침</Link>
            {" "}·{" "}
            <Link href="/about/" className="text-blue-600 dark:text-blue-400 hover:underline">소개</Link>
            {" "}·{" "}
            <Link href="/contact/" className="text-blue-600 dark:text-blue-400 hover:underline">연락처</Link>
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">시행일: 2024년 1월 1일</p>
        </div>
      </div>
    </div>
  );
}
